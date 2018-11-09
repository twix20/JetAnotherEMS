using JetAnotherEMS.Domain.Interfaces;
using JetAnotherEMS.Domain.Models;
using JetAnotherEMS.Infrastructure.Data.Context;

namespace JetAnotherEMS.Infrastructure.Data.Repository
{
    public class SchoolingEventDayRepository : EntityFrameworkRepository<SchoolingEventDay>, ISchoolingEventDayRepository
    {
        public SchoolingEventDayRepository(JetAnotherEmsContext context) : base(context)
        {
        }
    }
}
