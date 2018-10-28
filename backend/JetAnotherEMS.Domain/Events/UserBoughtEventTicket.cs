using System;
using System.Collections.Generic;
using System.Text;
using JetAnotherEMS.Domain.Core.Events;

namespace JetAnotherEMS.Domain.Events
{
    public class UserBoughtEventTicket : Event
    {

        public Guid SchoolingEventId { get; set; }

        public Guid UserId { get; set; }

        public string TicketName { get; set; }

        public decimal TicketPrice { get; set; }

        public UserBoughtEventTicket(Guid schoolingEventId, Guid userId, string ticketName, decimal ticketPrice)
        {
            SchoolingEventId = schoolingEventId;
            UserId = userId;
            TicketName = ticketName;
            TicketPrice = ticketPrice;
        }
    }
}
