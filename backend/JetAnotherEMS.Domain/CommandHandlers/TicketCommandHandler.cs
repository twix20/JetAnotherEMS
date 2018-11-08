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
        IRequestHandler<ChangeTicketStatusCommand>,
        IRequestHandler<ChangeTicketsStatusCommand>
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

            if (await Commit())
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

            if (await Commit())
            {
                //TODO: rise user canceled ticket event
                //await Bus.RaiseEvent(new UserBoughtEventTicket(ticket.Event.Id, message.UserId, ticket.Name, ticket.Price));
            }

            return Unit.Value;
        }
        public async Task<Unit> Handle(ChangeTicketStatusCommand message, CancellationToken cancellationToken)
        {
            //TODO: add validation


            var userEventTicket = await _userSchoolingEventTicketRepository.GetById(message.UserEventTicketId);

            userEventTicket.Status = message.NewTicketStatus;

            if (await Commit())
            {
                //TODO: rise event
            }

            return Unit.Value;
        }

        public async Task<Unit> Handle(ChangeTicketsStatusCommand message, CancellationToken cancellationToken)
        {
            //TODO: add validation

            foreach (var userEventTicketId in message.UserEventTicketIds)
            {
                var userEventTicket = await _userSchoolingEventTicketRepository.GetById(userEventTicketId);

                if (userEventTicket.Status == TicketStatus.AwaitingApproval)
                {
                    userEventTicket.Status = message.NewTicketStatus;
                }
            }

            if (await Commit())
            {
                //TODO: rise event
            }

            return Unit.Value;
        }
    }
}
