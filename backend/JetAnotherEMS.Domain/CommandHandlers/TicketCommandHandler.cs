using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using JetAnotherEMS.Domain.CommandHandlers;
using JetAnotherEMS.Domain.Commands.SchoolingEvent;
using JetAnotherEMS.Domain.Core.Bus;
using JetAnotherEMS.Domain.Core.Notifications;
using JetAnotherEMS.Domain.Core.Validation;
using JetAnotherEMS.Domain.Events;
using JetAnotherEMS.Domain.Interfaces;
using JetAnotherEMS.Domain.Models;
using MediatR;

namespace JetAnotherEMS.Domain.CommandHandlers
{
    public class TicketCommandHandler : CommandHandler,
        IRequestHandler<BuyEventTicketCommand>,
        IRequestHandler<CancelEventTicketCommand>,
        IRequestHandler<ApproveEventTicketCommand>,
        IRequestHandler<RejectEventTicketCommand>
    {

        private readonly ISchoolingEventTicketRepository _schoolingEventTicketRepository;
        private readonly IUserSchoolingEventTicketRepository _userSchoolingEventTicketRepository;

        public TicketCommandHandler(
            IUnitOfWork uow, 
            IMediatorHandler bus, 
            INotificationHandler<DomainNotification> notifications, 
            IValidationService validationService, 
            ISchoolingEventTicketRepository schoolingEventTicketRepository, 
            IUserSchoolingEventTicketRepository userSchoolingEventTicketRepository) : base(uow, bus, notifications, validationService)
        {
            _schoolingEventTicketRepository = schoolingEventTicketRepository;
            _userSchoolingEventTicketRepository = userSchoolingEventTicketRepository;
        }

        public async Task<Unit> Handle(BuyEventTicketCommand message, CancellationToken cancellationToken)
        {
            if (!message.IsValid(ValidationService))
            {
                NotifyValidationErrors(message);
                return Unit.Value;
            }

            var ticket = await _schoolingEventTicketRepository.GetById(message.TicketId);

            var userTicket = new UserSchoolingEventTicket()
            {
                UserId = message.UserId,
                Ticket = ticket,
                Status = TicketStatus.AwaitingApproval
            };

            ticket.Event.ParticipantsTickets.Add(userTicket);

            _schoolingEventTicketRepository.Update(ticket);

            if (Commit())
            {
                await Bus.RaiseEvent(new UserBoughtEventTicket(ticket.Event.Id, message.UserId, ticket.Name, ticket.Price));
            }

            return Unit.Value;
        }

        public async Task<Unit> Handle(CancelEventTicketCommand message, CancellationToken cancellationToken)
        {
            //TODO: validation
            //if (!message.IsValid(ValidationService))
            //{
            //    NotifyValidationErrors(message);
            //    return Unit.Value;
            //}

            await _userSchoolingEventTicketRepository.Remove(message.UserEventTicketId);

            if (Commit())
            {
                //TODO: rise user canceled ticket event
                //await Bus.RaiseEvent(new UserBoughtEventTicket(ticket.Event.Id, message.UserId, ticket.Name, ticket.Price));
            }

            return Unit.Value;
        }
        public async Task<Unit> Handle(ApproveEventTicketCommand message, CancellationToken cancellationToken)
        {
            var commitSucceed = await ApplyApproval(message.UserSchoolingEventTicketIdToApprove, TicketStatus.Approved);

            if (commitSucceed)
            {
                //TODO: rise event
            }

            return Unit.Value;
        }

        public async Task<Unit> Handle(RejectEventTicketCommand message, CancellationToken cancellationToken)
        {
            var commitSucceed = await ApplyApproval(message.UserSchoolingEventTicketIdToReject, TicketStatus.Rejected);

            if (commitSucceed)
            {
                //TODO: rise event
            }

            return Unit.Value;
        }

        private async Task<bool> ApplyApproval(Guid userEventTicketId, TicketStatus newStatus)
        {
            var userEventTicket = await _userSchoolingEventTicketRepository.GetById(userEventTicketId);

            userEventTicket.Status = newStatus;

            return Commit();
        }
    }
}
