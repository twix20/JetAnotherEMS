using System;
using System.Collections.Generic;
using System.Text;
using JetAnotherEMS.Domain.Models;

namespace JetAnotherEMS.Application.ViewModels
{
    public class ChangeTicketsStatusViewModel
    {
        public Guid UserId { get; set; }

        public IEnumerable<Guid> UserEventTicketIds { get; set; }

        public TicketStatus NewTicketStatus { get; set; }
    }
}
