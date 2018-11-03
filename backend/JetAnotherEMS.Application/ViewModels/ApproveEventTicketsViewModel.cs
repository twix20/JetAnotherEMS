using System;
using System.Collections.Generic;
using System.Text;

namespace JetAnotherEMS.Application.ViewModels
{
    public class ApproveEventTicketsViewModel
    {
        public Guid EventId { get; set; }

        /// <summary>
        /// User, that have power to approve tickets
        /// </summary>
        public Guid UserId { get; set; }

        public ICollection<Guid> UserSchoolingEventTicketIdsToApprove { get; set; }
    }
}
