using JetAnotherEMS.Domain.Interfaces;
using JetAnotherEMS.Domain.Models;
using JetAnotherEMS.Infrastructure.Data.Context;

namespace JetAnotherEMS.Infrastructure.Data.Repository
{
    public class SchoolingEventGalleryFileRepository : EntityFrameworkRepository<SchoolingEventGalleryFile>, ISchoolingEventGalleryFileRepository
    {
        public SchoolingEventGalleryFileRepository(JetAnotherEmsContext context) : base(context)
        {
        }
    }
}
