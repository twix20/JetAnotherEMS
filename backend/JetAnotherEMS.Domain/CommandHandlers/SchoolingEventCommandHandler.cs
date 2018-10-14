using System;
using System.Threading;
using System.Threading.Tasks;
using JetAnotherEMS.Domain.Commands.SchoolingEvent;
using JetAnotherEMS.Domain.Core.Bus;
using JetAnotherEMS.Domain.Core.Notifications;
using JetAnotherEMS.Domain.Core.Validation;
using JetAnotherEMS.Domain.Interfaces;
using MediatR;

namespace JetAnotherEMS.Domain.CommandHandlers
{
    public class SchoolingEventCommandHandler : CommandHandler,
        IRequestHandler<CreateNewSchoolingEventCommand>,
        IRequestHandler<ChangeFollowSchoolingEventCommand>
    {
        public SchoolingEventCommandHandler(IUnitOfWork uow, IMediatorHandler bus, INotificationHandler<DomainNotification> notifications, IValidationService validationService) : base(uow, bus, notifications, validationService)
        {
        }

        public Task<Unit> Handle(CreateNewSchoolingEventCommand request, CancellationToken cancellationToken)
        {
            // Bus.RaiseEvent( new SchoolingEventCreatedEvent(eventId));
            throw new NotImplementedException();
        }

        public Task<Unit> Handle(ChangeFollowSchoolingEventCommand request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
