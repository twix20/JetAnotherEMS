using System;
using JetAnotherEMS.Domain.Core.Events;

namespace JetAnotherEMS.Domain.Events
{
    public class SchoolingEventCreatedEvent : Event
    {
        public Guid EventId { get; set; }
    }
}
