using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper.QueryableExtensions;
using JetAnotherEMS.Domain.Interfaces;
using JetAnotherEMS.Domain.Models;
using JetAnotherEMS.Infrastructure.Data.Context;
using Microsoft.EntityFrameworkCore;

namespace JetAnotherEMS.Infrastructure.Data.Repository
{
    public class SchoolingEventRepository : EntityFrameworkRepository<SchoolingEvent>, ISchoolingEventRepository
    {
        private IFileRepository _fileRepository;

        public SchoolingEventRepository(JetAnotherEmsContext context, IFileRepository fileRepository) : base(context)
        {
            _fileRepository = fileRepository;
        }

        public override async Task Add(SchoolingEvent entity)
        {
            await PerformFileAssigning(entity);

            await base.Add(entity);
        }

        public override void Update(SchoolingEvent entity)
        {
            foreach (var availableTicket in entity.AvailableTickets)
            {
                Context.Entry(availableTicket).State = availableTicket.Id == Guid.Empty ? EntityState.Added : EntityState.Modified;
            }

            PerformFileAssigning(entity).Wait();

            base.Update(entity);
        }

        public async Task<bool> IsUserFollowingEvent(Guid userId, Guid eventId)
        {
            return await DbSet.Where(e => e.Id == eventId && e.Followers.Any(f => f.UserId == userId)).FirstOrDefaultAsync() != null;
        }

        private async Task PerformFileAssigning(SchoolingEvent entity)
        {
            async Task FileAssignerHelper<T>(IEnumerable<T> fileEntities, Func<T, bool> additionalPredicate)
                where T : UploadedFile
            {

                var fileIdsToAssign = fileEntities.Select(f => f.Id);


                var all = await _fileRepository.GetAll().ToListAsync();

                var d = all.Where(uploadedFile => fileIdsToAssign.Contains(uploadedFile.Id)).ToList();

                var dbFiles = Context.UploadedFiles
                    .Where(uploadedFile => fileIdsToAssign.Contains(uploadedFile.Id))
                    .ToDictionary(x => x.Id, x => x);

                foreach (var fileEntity in fileEntities)
                {
                    var dbFile = dbFiles[fileEntity.Id];

                    Context.Remove(dbFile);
                    Context.SaveChanges();

                    Context.Entry(fileEntity).CurrentValues.SetValues(dbFile);
                    Context.Entry(fileEntity).Property(x => x.Id).CurrentValue = Guid.Empty;
                    Context.Entry(fileEntity).Property("Discriminator").CurrentValue = typeof(T).Name;

                    var s = Context.Entry(fileEntity).State;

                    Context.Update(fileEntity);
                    Context.SaveChanges();
                }

                var toRemove = await Context.Set<T>().Where(x => !fileEntities.Select(g => g.Id).Contains(x.Id) && additionalPredicate(x)).ToListAsync();
                Context.RemoveRange(toRemove);
            }

            if (entity.Gallery != null)
            {
                await FileAssignerHelper<SchoolingEventGalleryFile>(entity.Gallery, x => x.EventId == entity.Id);
            }

            if (entity.Schedule != null)
            {
                var dbSchedule = await Context.SchoolingEventDays.Where(x => x.Event.Id == entity.Id).AsNoTracking().ToDictionaryAsync(x => x.Id, x => x);

                foreach (var eventDay in entity.Schedule)
                {
                    Context.Entry(eventDay).State = dbSchedule.ContainsKey(eventDay.Id) ? EntityState.Modified : EntityState.Added;

                    if (eventDay.Attachments != null)
                    {
                        await FileAssignerHelper<SchoolingEventDayAttachment>(eventDay.Attachments, a => a.SchoolingEventDayId == eventDay.Id);
                    }

                    if (eventDay.Tags != null)
                    {
                        var tagsToRemove = await Context.SchoolingEventDayTags.Where(t => t.EventDay.Id == eventDay.Id).ToListAsync();
                        Context.RemoveRange(tagsToRemove);
                    }
                }

                var newDayIds = entity.Schedule.Where(x => x.GetType() == typeof(SchoolingEventDay)).Select(x => x.Id);
                var daysToDelete = dbSchedule.Values.Where(dbScheduleValue => !newDayIds.Contains(dbScheduleValue.Id));
                Context.RemoveRange(daysToDelete);
            }
        }
    }
}
