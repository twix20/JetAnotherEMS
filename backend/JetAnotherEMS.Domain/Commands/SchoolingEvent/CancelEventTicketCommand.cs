using System;
using System.Collections.Generic;
using System.Text;
using JetAnotherEMS.Domain.Core.Commands;

namespace JetAnotherEMS.Domain.Commands.SchoolingEvent
{
    public class CancelEventTicketCommand : Command
    {
        public Guid UserEventTicketId { get; set; }

        public Guid UserId { get; set; }

        public CancelEventTicketCommand(Guid userEventTicketId, Guid userId)
        {
            UserEventTicketId = userEventTicketId;
            UserId = userId;
        }
    }
}
