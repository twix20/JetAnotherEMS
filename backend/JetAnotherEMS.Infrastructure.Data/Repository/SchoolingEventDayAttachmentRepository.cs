using JetAnotherEMS.Domain.Interfaces;
using JetAnotherEMS.Domain.Models;
using JetAnotherEMS.Infrastructure.Data.Context;

namespace JetAnotherEMS.Infrastructure.Data.Repository
{
    public class SchoolingEventDayAttachmentRepository : EntityFrameworkRepository<SchoolingEventDayAttachment>, ISchoolingEventDayAttachmentRepository
    {
        public SchoolingEventDayAttachmentRepository(JetAnotherEmsContext context) : base(context)
        {
        }
    }
}
