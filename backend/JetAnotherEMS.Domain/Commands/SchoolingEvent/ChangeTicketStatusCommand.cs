using System;
using System.Collections.Generic;
using System.Text;
using JetAnotherEMS.Domain.Core.Commands;
using JetAnotherEMS.Domain.Models;

namespace JetAnotherEMS.Domain.Commands.SchoolingEvent
{
    public class ChangeTicketStatusCommand : Command
    {
        public Guid UserId { get; set; }

        public Guid UserEventTicketId { get; set; }

        public TicketStatus NewTicketStatus { get; set; }
    }
}
