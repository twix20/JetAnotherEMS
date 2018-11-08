using System.Threading.Tasks;
using JetAnotherEMS.Domain.Core.Bus;
using JetAnotherEMS.Domain.Core.Commands;
using JetAnotherEMS.Domain.Core.Notifications;
using JetAnotherEMS.Domain.Core.Validation;
using JetAnotherEMS.Domain.Interfaces;
using MediatR;

namespace JetAnotherEMS.Domain.CommandHandlers
{
    public abstract class CommandHandler
    {
        public IUnitOfWork Uow { get; }
        public IMediatorHandler Bus { get; }
        public DomainNotificationHandler Notifications { get; }
        public IValidationService ValidationService { get; }

        public CommandHandler(
            IUnitOfWork uow, 
            IMediatorHandler bus, 
            INotificationHandler<DomainNotification> notifications, 
            IValidationService validationService)
        {
            Uow = uow;
            Notifications = (DomainNotificationHandler)notifications;
            Bus = bus;
            ValidationService = validationService;
        }

        protected void NotifyValidationErrors(Command message)
        {
            foreach (var error in message.ValidationResult.Errors)
            {
                Bus.RaiseEvent(new DomainNotification(message.MessageType, error.ErrorMessage));
            }
        }

        public async Task<bool> Commit()
        {
            if (Notifications.HasNotifications()) return false;

            var commitSucceed = await Uow.Commit();
            if (commitSucceed) return true;

            await Bus.RaiseEvent(new DomainNotification("Commit", "We had a problem during saving your data."));
            return false;
        }
    }
}
