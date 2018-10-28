﻿using System;
using System.Threading;
using System.Threading.Tasks;
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
    public class SchoolingEventCommandHandler : CommandHandler,
        IRequestHandler<CreateNewSchoolingEventCommand>,
        IRequestHandler<UpdateSchoolingEventCommand>,
        IRequestHandler<ChangeFollowSchoolingEventCommand>,
        IRequestHandler<BuyEventTicketCommand>, //TODO: move to another handler
        IRequestHandler<CancelEventTicketCommand> //TODO: move to another handler
    {
        private readonly ISchoolingEventRepository _schoolingEventRepository;
        private readonly ISchoolingEventTicketRepository _schoolingEventTicketRepository;
        private readonly IUserSchoolingEventTicketRepository _userSchoolingEventTicketRepository;
        public SchoolingEventCommandHandler(
            IUnitOfWork uow, 
            IMediatorHandler bus, 
            INotificationHandler<DomainNotification> notifications, 
            IValidationService validationService, 
            ISchoolingEventRepository schoolingEventRepository, 
            ISchoolingEventTicketRepository schoolingEventTicketRepository, 
            IUserSchoolingEventTicketRepository userSchoolingEventTicketRepository) : base(uow, bus, notifications, validationService)
        {
            _schoolingEventRepository = schoolingEventRepository;
            _schoolingEventTicketRepository = schoolingEventTicketRepository;
            _userSchoolingEventTicketRepository = userSchoolingEventTicketRepository;
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

        public Task<Unit> Handle(UpdateSchoolingEventCommand request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
