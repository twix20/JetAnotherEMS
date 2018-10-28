using System;

namespace JetAnotherEMS.Domain.Models
{
    public class SchoolingEventTicket : Ticket
    {
        public virtual SchoolingEvent Event { get; set; }
    }

    public enum SchoolingEventTicketStatus
    {
        Unknown = 0,
        Requested,
        Accepted,
        Rejected
    }
}
