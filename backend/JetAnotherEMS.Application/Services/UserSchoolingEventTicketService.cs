using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using JetAnotherEMS.Application.Interfaces;
using JetAnotherEMS.Application.ViewModels;
using JetAnotherEMS.Domain.Commands.SchoolingEvent;
using JetAnotherEMS.Domain.Core.Bus;
using JetAnotherEMS.Domain.Core.Notifications;
using JetAnotherEMS.Domain.Interfaces;

namespace JetAnotherEMS.Application.Services
{
    public class UserSchoolingEventTicketService : IUserSchoolingEventTicketService
    {
        private readonly IMediatorHandler _bus;
        private readonly IUserSchoolingEventTicketRepository _userSchoolingEventTicketRepository;

        public UserSchoolingEventTicketService(IMediatorHandler bus, IUserSchoolingEventTicketRepository userSchoolingEventTicketRepository)
        {
            _bus = bus;
            _userSchoolingEventTicketRepository = userSchoolingEventTicketRepository;
        }

        public async Task<UserSchoolingEventTicketViewModel> GetById(Guid id)
        {
            var entity = await _userSchoolingEventTicketRepository.GetById(id);

            return Mapper.Map<UserSchoolingEventTicketViewModel>(entity);
        }

        public async Task<UserSchoolingEventTicketViewModel> GetEventTicketForUser(Guid userId, Guid eventId)
        {
            var ticket = await _userSchoolingEventTicketRepository.GetEventTicketForUser(userId, eventId);
            if (ticket == null)
            {
                await _bus.RaiseEvent(new DomainNotification(nameof(UserSchoolingEventTicketService),
                    $"User {userId} doesn't have ticket for event {eventId}"));
                return null;
            }

            return Mapper.Map<UserSchoolingEventTicketViewModel>(ticket);
        }

        public async Task BuyTicket(BuyEventTicketViewModel viewModel)
        {
            var command = Mapper.Map<BuyEventTicketCommand>(viewModel);

            await _bus.SendCommand(command);
        }

        public async Task CancelTicket(CancelEventTicketViewModel viewModel)
        {
            var command = Mapper.Map<CancelEventTicketCommand>(viewModel);

            await _bus.SendCommand(command);
        }

        public async Task ChangeTicketsStatus(ChangeTicketsStatusViewModel viewModel)
        {
            var command = Mapper.Map<ChangeTicketsStatusCommand>(viewModel);

            await _bus.SendCommand(command);
        }

        public async Task ChangeTicketStatus(ChangeTicketStatusViewModel viewModel)
        {
            var command = Mapper.Map<ChangeTicketStatusCommand>(viewModel);

            await _bus.SendCommand(command);
        }
    }
}
