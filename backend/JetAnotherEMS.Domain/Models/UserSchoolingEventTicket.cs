using System;
using JetAnotherEMS.Domain.Core.Models;

namespace JetAnotherEMS.Domain.Models
{
    public class UserSchoolingEventTicket : Entity
    {
        public Guid UserId { get; set; }

        public TicketStatus Status { get; set; }

        public virtual SchoolingEventTicket Ticket { get; set; }
    }

    public enum TicketStatus
    {
        Unknown,
        AwaitingApproval,
        Approved,
        Rejected
    }
}
