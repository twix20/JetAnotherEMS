using JetAnotherEMS.Domain.Core.Commands;
using JetAnotherEMS.Domain.Core.Events;
using System.Threading.Tasks;

namespace JetAnotherEMS.Domain.Core.Bus
{
    public interface IMediatorHandler
    {
        Task SendCommand<T>(T command) where T : Command;
        Task RaiseEvent<T>(T @event) where T : Event;
    }
}
