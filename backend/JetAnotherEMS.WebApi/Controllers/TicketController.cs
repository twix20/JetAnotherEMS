using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IdentityServer4.Extensions;
using JetAnotherEMS.Application.Interfaces;
using JetAnotherEMS.Application.ViewModels;
using JetAnotherEMS.Domain.Core.Bus;
using JetAnotherEMS.Domain.Core.Notifications;
using JetAnotherEMS.Domain.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace JetAnotherEMS.WebApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class TicketController : ApiController
    {
        private readonly IUser _user;
        private readonly IUserSchoolingEventTicketService _userSchoolingEventTicketService;

        public TicketController(
            INotificationHandler<DomainNotification> notifications, 
            IMediatorHandler mediator, 
            IUserSchoolingEventTicketService userSchoolingEventTicketService, 
            IUser user) : base(notifications, mediator)
        {
            _userSchoolingEventTicketService = userSchoolingEventTicketService;
            _user = user;
        }

        [HttpGet]
        [Route("me/[action]/{eventId:guid}")]
        public async Task<IActionResult> ByEvent(Guid eventId)
        {
            var usersTicket = await _userSchoolingEventTicketService.GetEventTicketForUser(_user.Id, eventId);

            return Response(usersTicket);
        }

        [HttpPost]
        [Route("me/[action]")]
        public async Task<IActionResult> Buy([FromBody]BuyEventTicketViewModel viewModel)
        {
            if (!ModelState.IsValid)
            {
                NotifyModelStateErrors();
                return Response(viewModel);
            }

            viewModel.UserId = _user.Id;

            await _userSchoolingEventTicketService.BuyTicket(viewModel);

            return Response(new {});
        }

        [HttpPost]
        [Route("me/[action]")]
        public async Task<IActionResult> Cancel([FromBody]CancelEventTicketViewModel viewModel)
        {
            if (!ModelState.IsValid)
            {
                NotifyModelStateErrors();
                return Response(viewModel);
            }

            viewModel.UserId = _user.Id;

            await _userSchoolingEventTicketService.CancelTicket(viewModel);

            return Response(new { });
        }


        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> ChangeStatuses([FromBody]ChangeTicketsStatusViewModel viewModel)
        {
            if (!ModelState.IsValid)
            {
                NotifyModelStateErrors();
                return Response(viewModel);
            }

            viewModel.UserId = _user.Id;

            await _userSchoolingEventTicketService.ChangeTicketsStatus(viewModel);

            return Response(new { });
        }


        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> ChangeStatus([FromBody]ChangeTicketStatusViewModel viewModel)
        {
            if (!ModelState.IsValid)
            {
                NotifyModelStateErrors();
                return Response(viewModel);
            }

            viewModel.UserId = _user.Id;

            await _userSchoolingEventTicketService.ChangeTicketStatus(viewModel);

            return Response(new { });
        }
    }
}