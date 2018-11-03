using System;

namespace JetAnotherEMS.Application.ViewModels
{
    public class BuyEventTicketViewModel 
    {
        public Guid EventId { get; set; }

        public Guid TicketId { get; set; }

        public Guid UserId { get; set; }
    }
}
