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
        public SchoolingEventRepository(JetAnotherEmsContext context) : base(context)
        {
        }

        public override async Task Add(SchoolingEvent entity)
        {
            Task task = Task.Run(async () => await PerformFileAssigning(entity));
            task.Wait();

            await base.Add(entity);
        }

        public override void Update(SchoolingEvent entity)
        {
            foreach (var availableTicket in entity.AvailableTickets)
            {
                Context.Entry(availableTicket).State = availableTicket.Id == Guid.Empty ? EntityState.Added : EntityState.Modified;
            }

            base.Update(entity);

            Task task = Task.Run(async () => await PerformFileAssigning(entity));
            task.Wait();

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
                var dbFiles = await Context.UploadedFiles.Where(x => fileEntities.Select(f => f.Id).Contains(x.Id)).ProjectTo<T>().ToDictionaryAsync(x => x.Id, x => x);

                foreach (var fileEntity in fileEntities)
                {
                    var dbFile = dbFiles[fileEntity.Id];

                    fileEntity.LocationOnDisk = dbFile.LocationOnDisk;
                    fileEntity.FileName = dbFile.FileName;
                    fileEntity.OriginalName = dbFile.OriginalName;
                    fileEntity.Size = dbFile.Size;
                    fileEntity.FtpFileUrl = dbFile.FtpFileUrl;
                    fileEntity.CreatedAt = dbFile.CreatedAt;
                    fileEntity.CreatedByUserId = dbFile.CreatedByUserId;

                    Context.Entry(fileEntity).Property("Discriminator").CurrentValue = typeof(T).Name;

                    Context.Update(fileEntity);
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
                var dbSchedule = await Context.SchoolingEventDays.Where(x => x.Event.Id == entity.Id).ToDictionaryAsync(x => x.Id, x => x);

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
