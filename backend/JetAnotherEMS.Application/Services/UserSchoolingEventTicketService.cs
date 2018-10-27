using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using JetAnotherEMS.Application.Interfaces;
using JetAnotherEMS.Application.ViewModels;
using JetAnotherEMS.Domain.Commands.SchoolingEvent;
using JetAnotherEMS.Domain.Core.Bus;
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

        public async Task<SchoolingEventTicketViewModel> GetEventTicketForUser(Guid userId, Guid eventId)
        {
            var ticket = await _userSchoolingEventTicketRepository.GetEventTicketForUser(userId, eventId);

            return Mapper.Map<SchoolingEventTicketViewModel>(ticket);
        }

        public async Task BuyTicket(BuyEventTicketViewModel viewModel)
        {
            var command = Mapper.Map<BuyEventTicketCommand>(viewModel);

            await _bus.SendCommand(command);
        }
    }
}
