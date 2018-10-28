using System;
using System.Threading;
using System.Threading.Tasks;
using JetAnotherEMS.Domain.Commands.SchoolingEvent;
using JetAnotherEMS.Domain.Core.Bus;
using JetAnotherEMS.Domain.Core.Notifications;
using JetAnotherEMS.Domain.Core.Validation;
using JetAnotherEMS.Domain.Interfaces;
using JetAnotherEMS.Domain.Models;
using MediatR;

namespace JetAnotherEMS.Domain.CommandHandlers
{
    public class SchoolingEventCommandHandler : CommandHandler,
        IRequestHandler<CreateNewSchoolingEventCommand>,
        IRequestHandler<UpdateSchoolingEventCommand>,
        IRequestHandler<ChangeFollowSchoolingEventCommand>,
        IRequestHandler<BuyEventTicketCommand>
    {
        private readonly ISchoolingEventRepository _schoolingEventRepository;
        public SchoolingEventCommandHandler(
            IUnitOfWork uow, 
            IMediatorHandler bus, 
            INotificationHandler<DomainNotification> notifications, 
            IValidationService validationService, ISchoolingEventRepository schoolingEventRepository) : base(uow, bus, notifications, validationService)
        {
            _schoolingEventRepository = schoolingEventRepository;
        }

        public Task<Unit> Handle(CreateNewSchoolingEventCommand request, CancellationToken cancellationToken)
        {
            _schoolingEventRepository.Add(new SchoolingEvent());
            // Bus.RaiseEvent( new SchoolingEventCreatedEvent(eventId));
            throw new NotImplementedException();
        }

        public Task<Unit> Handle(ChangeFollowSchoolingEventCommand request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<Unit> Handle(BuyEventTicketCommand request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<Unit> Handle(UpdateSchoolingEventCommand request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
