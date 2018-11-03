using System;
using JetAnotherEMS.Domain.Core.Events;

namespace JetAnotherEMS.Domain.Events
{
    public class SchoolingEventCreatedEvent : Event
    {
        public Guid EventId { get; set; }

        public SchoolingEventCreatedEvent(Guid eventId)
        {
            EventId = eventId;
        }
    }
}
