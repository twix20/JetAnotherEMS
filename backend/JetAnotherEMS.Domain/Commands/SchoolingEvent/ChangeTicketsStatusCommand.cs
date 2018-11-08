using System;
using System.Collections.Generic;
using System.Text;
using JetAnotherEMS.Domain.Core.Commands;
using JetAnotherEMS.Domain.Models;

namespace JetAnotherEMS.Domain.Commands.SchoolingEvent
{
    public class ChangeTicketsStatusCommand : Command
    {
        public Guid UserId { get; set; }

        public IEnumerable<Guid> UserEventTicketIds { get; set; }

        public TicketStatus NewTicketStatus { get; set; }
    }
}
