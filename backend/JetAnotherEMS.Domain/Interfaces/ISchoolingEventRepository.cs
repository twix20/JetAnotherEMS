using System;
using System.Threading.Tasks;
using JetAnotherEMS.Domain.Models;

namespace JetAnotherEMS.Domain.Interfaces
{
    public interface ISchoolingEventRepository : IRepository<SchoolingEvent>
    {
        Task<bool> IsUserFollowingEvent(Guid userId, Guid eventId);
        Task UpdateEntireEvent(SchoolingEvent entity);
        Task CreateEntireEvent(SchoolingEvent entity);
    }
}
