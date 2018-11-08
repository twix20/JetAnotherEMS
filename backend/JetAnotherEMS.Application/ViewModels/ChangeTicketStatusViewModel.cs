using System;
using System.Collections.Generic;
using System.Text;
using JetAnotherEMS.Domain.Models;

namespace JetAnotherEMS.Application.ViewModels
{
    public class ChangeTicketStatusViewModel
    {
        public Guid UserId { get; set; }

        public Guid UserEventTicketId { get; set; }

        public TicketStatus NewTicketStatus { get; set; }
    }
}
