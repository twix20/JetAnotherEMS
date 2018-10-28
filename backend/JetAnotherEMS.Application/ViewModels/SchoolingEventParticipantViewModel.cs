using System;
using System.Collections.Generic;
using System.Text;
using JetAnotherEMS.Domain.Models;

namespace JetAnotherEMS.Application.ViewModels
{
    public class SchoolingEventParticipantViewModel
    {
        public Guid UserId { get; set; }

        public string UserEmail { get; set; }

        public TicketStatus Status { get; set; }

        public string TicketName { get; set; }

        public decimal TicketPrice { get; set; }

        public uint TicketTotalQuantity { get; set; }
    }
}
