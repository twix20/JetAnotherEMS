using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper.QueryableExtensions;
using JetAnotherEMS.Domain.Core.Models;
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

        public override void Update(SchoolingEvent entity)
        {
            FetchUploadedFileEntities(entity).Wait();

            base.Update(entity);
        }


        private async Task FetchUploadedFileEntities(SchoolingEvent entity)
        {
            async Task<List<T>> FileAssignerHelper<T>(IEnumerable<Entity> fileEntities)
                where T : Entity
            {
                var dbFiles = await Context.UploadedFiles.Where(x => fileEntities.Select(f => f.Id).Contains(x.Id)).ProjectTo<T>().ToListAsync();

                foreach (var dbFile in dbFiles)
                {
                    Context.Entry(dbFile).Property("Discriminator").CurrentValue = typeof(T).Name;
                }

                var toRemove = await Context.UploadedFiles.Where(x => !fileEntities.Select(g => g.Id).Contains(x.Id)).ToListAsync();
                Context.RemoveRange(toRemove);

                return dbFiles;
            }

            if (entity.Gallery != null)
            {
                entity.Gallery = await FileAssignerHelper<SchoolingEventGalleryFile>(entity.Gallery);
            }

            if (entity.Schedule != null)
            {
                foreach (var eventDay in entity.Schedule)
                {
                    if (eventDay.Attachments != null)
                    {
                        eventDay.Attachments = await FileAssignerHelper<SchoolingEventDayAttachment>(eventDay.Attachments);
                    }
                }
            }

            base.Update(entity);
        }
    }
}
