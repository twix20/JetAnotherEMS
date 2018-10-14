using JetAnotherEMS.Domain.Core.Commands;

namespace JetAnotherEMS.Domain.Commands.SchoolingEvent
{
    public class CreateNewSchoolingEventCommand : Command
    {
        public Models.SchoolingEvent NewEvent { get; }

        public CreateNewSchoolingEventCommand(Models.SchoolingEvent newEvent)
        {
            NewEvent = newEvent;
        }
    }
}
