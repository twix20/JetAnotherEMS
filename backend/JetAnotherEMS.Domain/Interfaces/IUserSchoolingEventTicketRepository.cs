using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using JetAnotherEMS.Domain.Models;

namespace JetAnotherEMS.Domain.Interfaces
{
    public interface IUserSchoolingEventTicketRepository : IRepository<UserSchoolingEventTicket>
    {
        Task<UserSchoolingEventTicket> GetEventTicketForUser(Guid userId, Guid eventId);
    }

}
