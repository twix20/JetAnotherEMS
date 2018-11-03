using System;
using System.Collections.Generic;
using System.Text;
using JetAnotherEMS.Domain.Core.Commands;

namespace JetAnotherEMS.Domain.Commands.SchoolingEvent
{
    public class RejectEventTicketCommand : Command
    {
        public Guid EventId { get; set; }

        /// <summary>
        /// User, that have power to approve tickets
        /// </summary>
        public Guid UserId { get; set; }

        public Guid UserSchoolingEventTicketIdToReject { get; set; }
    }
}
