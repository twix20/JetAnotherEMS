using System;
using System.Collections.Generic;
using System.Text;

namespace JetAnotherEMS.Application.ViewModels
{
    public class RejectEventTicketsViewModel
    {
        public Guid EventId { get; set; }

        /// <summary>
        /// User, that have power to reject tickets
        /// </summary>
        public Guid UserId { get; set; }

        public ICollection<Guid> UserSchoolingEventTicketIdsToReject { get; set; }
    }
}
