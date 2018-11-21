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
        private readonly IFileRepository _fileRepository;

        public SchoolingEventRepository(JetAnotherEmsContext context, IFileRepository fileRepository) : base(context)
        {
            _fileRepository = fileRepository;
        }

        public async Task CreateEntireEvent(SchoolingEvent entity)
        {
            await PerformFileAssigning(entity);

            await base.Add(entity);
        }

        public async Task UpdateEntireEvent(SchoolingEvent entity)
        {
            var dbEntity = await GetById(entity.Id);

            entity.CreatedByUserId = dbEntity.CreatedByUserId;
            entity.CreatedAt = dbEntity.CreatedAt;

            entity.Schedule = entity.Schedule ?? new List<SchoolingEventDay>();
            foreach (var schoolingEventDay in entity.Schedule)
            {
                schoolingEventDay.Id = default(Guid);

                schoolingEventDay.Tags = schoolingEventDay.Tags ?? new List<SchoolingEventDayTag>();
                foreach (var dayTag in schoolingEventDay.Tags)
                {
                    dayTag.Id = default(Guid);
                }
            }

            Context.Entry(dbEntity).State = EntityState.Detached;

            await PerformFileAssigning(entity);

            base.Update(entity);
        }

        public async Task<bool> IsUserFollowingEvent(Guid userId, Guid eventId)
        {
            return await DbSet.Where(e => e.Id == eventId && e.Followers.Any(f => f.UserId == userId)).FirstOrDefaultAsync() != null;
        }

        private async Task PerformFileAssigning(SchoolingEvent eventToAssign)
        {
            async Task FileAssignerHelper<T>(ICollection<T> fileEntities, Func<T, bool> additionalPredicate)
                where T : UploadedFile
            {
                var dbFiles = await Context.UploadedFiles
                    .Where(uploadedFile => fileEntities.Select(f => f.Id).Contains(uploadedFile.Id))
                    .ToDictionaryAsync(x => x.Id, x => x);

                foreach (var fileEntity in fileEntities.ToList())
                {
                    var dbFile = dbFiles[fileEntity.Id];

                    Context.Entry(fileEntity).CurrentValues.SetValues(dbFile);
                    Context.Entry(fileEntity).Property(x => x.Id).CurrentValue = Guid.Empty;
                    Context.Entry(fileEntity).Property("Discriminator").CurrentValue = typeof(T).Name;

                    Context.Update(fileEntity);
                    Context.SaveChanges();
                }

                Context.SaveChanges();
            }

            if (eventToAssign.Gallery != null)
            {
                await FileAssignerHelper<SchoolingEventGalleryFile>(eventToAssign.Gallery, x => x.EventId == eventToAssign.Id);
            }

            if (eventToAssign.Schedule != null)
            {
                foreach (var eventDay in eventToAssign.Schedule)
                {
                    if (eventDay.Attachments != null)
                    {
                        await FileAssignerHelper<SchoolingEventDayAttachment>(eventDay.Attachments, a => a.SchoolingEventDayId == eventDay.Id);
                    }
                }
            }
        }
    }
}
