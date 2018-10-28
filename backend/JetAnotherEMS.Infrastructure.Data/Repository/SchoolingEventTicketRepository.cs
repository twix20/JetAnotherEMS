using JetAnotherEMS.Domain.Interfaces;
using JetAnotherEMS.Domain.Models;
using JetAnotherEMS.Infrastructure.Data.Context;

namespace JetAnotherEMS.Infrastructure.Data.Repository
{
    public class SchoolingEventTicketRepository : EntityFrameworkRepository<SchoolingEventTicket>, ISchoolingEventTicketRepository
    {
        public SchoolingEventTicketRepository(JetAnotherEmsContext context) : base(context)
        {
        }
    }
}
