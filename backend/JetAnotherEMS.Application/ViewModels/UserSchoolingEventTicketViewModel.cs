using System;
using System.Collections.Generic;
using System.Text;
using JetAnotherEMS.Domain.Models;

namespace JetAnotherEMS.Application.ViewModels
{
    public class UserSchoolingEventTicketViewModel : EntityViewModel
    {
        public Guid UserId { get; set; }

        public TicketStatus Status { get; set; }

        public SchoolingEventTicketViewModel Ticket { get; set; }
    }
}
