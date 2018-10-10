using System;
using System.Collections.Generic;
using JetAnotherEMS.Domain.Core.Events;

namespace JetAnotherEMS.Infrastructure.Data.Repository.EventSourcing
{
    public interface IEventStoreRepository : IDisposable
    {
        void Store(StoredEvent theEvent);
        IList<StoredEvent> All(Guid aggregateId);
    }
}
