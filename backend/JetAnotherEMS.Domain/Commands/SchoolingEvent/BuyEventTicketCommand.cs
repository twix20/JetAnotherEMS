using System;
using System.Collections.Generic;
using System.Text;
using JetAnotherEMS.Domain.Core.Commands;

namespace JetAnotherEMS.Domain.Commands.SchoolingEvent
{
    public class BuyEventTicketCommand : Command
    {
        public Guid TicketId { get; set; }

        public Guid UserId { get; set; }

        public Guid EventId { get; set; }

        public BuyEventTicketCommand(Guid eventId, Guid userId, Guid ticketId)
        {
            EventId = eventId;
            UserId = userId;
            TicketId = ticketId;
        }
    }
}
