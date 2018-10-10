using System;
using System.Collections.Generic;
using System.Text;
using JetAnotherEMS.Domain.Core.Models;

namespace JetAnotherEMS.Domain.Models
{
    public class Ticket : Entity
    {
        public string Name { get; set; }

        public decimal Price { get; set; }

        public uint TotalQuantity { get; set; }

        public TicketStatus Status { get; set; }
    }

    public enum TicketStatus
    {
        Unknown,
        AwaitingApproval,
        Approved,
        Rejected
    }
}
