using System;
using System.Threading;
using System.Threading.Tasks;
using JetAnotherEMS.Domain.Commands.User;
using JetAnotherEMS.Domain.Core.Bus;
using JetAnotherEMS.Domain.Core.Notifications;
using JetAnotherEMS.Domain.Core.Validation;
using JetAnotherEMS.Domain.Interfaces;
using MediatR;

namespace JetAnotherEMS.Domain.CommandHandlers
{
    public class UserCommandHandler : CommandHandler,
        IRequestHandler<RegisterNewUserCommand>
    {
        public UserCommandHandler(
            IUnitOfWork uow, 
            IMediatorHandler bus, 
            INotificationHandler<DomainNotification> notifications, 
            IValidationService validationService) : base(uow, bus, notifications, validationService)
        {
        }

        public Task<Unit> Handle(RegisterNewUserCommand request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

    }
}
