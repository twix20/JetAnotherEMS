using JetAnotherEMS.Domain.Interfaces;
using JetAnotherEMS.Domain.Models;
using JetAnotherEMS.Infrastructure.Data.Context;

namespace JetAnotherEMS.Infrastructure.Data.Repository
{
    public class SchoolingEventRepository : EntityFrameworkRepository<SchoolingEvent>, ISchoolingEventRepository
    {
        public SchoolingEventRepository(JetAnotherEmsContext context) : base(context)
        {
        }
    }
}
