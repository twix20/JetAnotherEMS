using System;
using System.Threading.Tasks;
using JetAnotherEMS.Domain.Interfaces;
using JetAnotherEMS.Domain.Models;
using JetAnotherEMS.Infrastructure.Data.Context;
using Microsoft.EntityFrameworkCore;

namespace JetAnotherEMS.Infrastructure.Data.Repository
{
    public class UserSchoolingEventTicketRepository : EntityFrameworkRepository<UserSchoolingEventTicket>, IUserSchoolingEventTicketRepository
    {
        public UserSchoolingEventTicketRepository(JetAnotherEmsContext context) : base(context)
        {
        }

        public Task<UserSchoolingEventTicket> GetEventTicketForUser(Guid userId, Guid eventId)
        {
            return DbSet.FirstOrDefaultAsync(t => t.Ticket.Event.Id == eventId && t.UserId == userId);
        }
    }
}
