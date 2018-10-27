using System;

namespace JetAnotherEMS.Domain.Models
{
    public class SchoolingEventTicket : Ticket
    {
        /// <summary>
        /// User which requested/bought a ticket 
        /// </summary>
        public Guid UserId { get; set; }

        public SchoolingEventTicketStatus Status { get; set; }

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
