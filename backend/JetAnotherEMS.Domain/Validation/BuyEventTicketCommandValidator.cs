using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using JetAnotherEMS.Domain.Commands.SchoolingEvent;
using JetAnotherEMS.Domain.Interfaces;

namespace JetAnotherEMS.Domain.Validation
{
    public class BuyEventTicketCommandValidator : AbstractValidator<BuyEventTicketCommand>
    {
        private readonly ISchoolingEventTicketRepository _schoolingEventTicketRepository;
        private readonly IUserSchoolingEventTicketRepository _userSchoolingEventTicketRepository;

        public BuyEventTicketCommandValidator(
            ISchoolingEventTicketRepository schoolingEventTicketRepository, 
            IUserSchoolingEventTicketRepository userSchoolingEventTicketRepository)
        {
            _schoolingEventTicketRepository = schoolingEventTicketRepository;
            _userSchoolingEventTicketRepository = userSchoolingEventTicketRepository;

            CascadeMode = CascadeMode.StopOnFirstFailure;

            //TODO: add more validation
            ValidateTicket();
        }

        public void ValidateTicket()
        {
            RuleFor(c => c.TicketId)
                .MustAsync(Exist)
                .WithMessage("Ticket doesn't exist")
                .MustAsync(NotHaveTicketBoughtAlready)
                .WithMessage("You already bought a ticket for this event");
        }

        public async Task<bool> Exist(Guid ticketId, CancellationToken ct)
        {
            var ticket = await _schoolingEventTicketRepository.GetById(ticketId);
            return ticket != null;
        }

        public async Task<bool> NotHaveTicketBoughtAlready(BuyEventTicketCommand command, Guid ticketId, CancellationToken ct)
        {
            var eventTicket = await _schoolingEventTicketRepository.GetById(ticketId);

            var usersTicket = await _userSchoolingEventTicketRepository.GetEventTicketForUser(command.UserId, eventTicket.Event.Id);

            return usersTicket == null;
        }
    }
}
