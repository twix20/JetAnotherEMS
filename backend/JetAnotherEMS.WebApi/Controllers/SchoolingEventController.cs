using System;
using System.Threading.Tasks;
using JetAnotherEMS.Application.Interfaces;
using JetAnotherEMS.Application.ViewModels;
using JetAnotherEMS.Domain.Core.Bus;
using JetAnotherEMS.Domain.Core.Notifications;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace JetAnotherEMS.WebApi.Controllers
{
    [Authorize]
    public class SchoolingEventController : ApiController
    {
        private readonly ISchoolingEventService _schoolingEventService;

        public SchoolingEventController(
            INotificationHandler<DomainNotification> notifications, 
            IMediatorHandler mediator,
            ISchoolingEventService schoolingEventService) : base(notifications, mediator)
        {
            _schoolingEventService = schoolingEventService;
        }

        [HttpGet]
        [AllowAnonymous]
        public Task<IActionResult> Get()
        {
            return Task.FromResult(Response(_schoolingEventService.GetAll()));
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> Get(Guid id)
        {
            return Response(await _schoolingEventService.GetById(id));
        }

        [HttpPost]
        [Authorize(Policy = "CanCreateSchoolingEvent")]
        public async Task<IActionResult> Post([FromBody]SchoolingEventViewModel viewModel)
        {
            if (!ModelState.IsValid)
            {
                NotifyModelStateErrors();
                return Response(viewModel);
            }

            await _schoolingEventService.Create(viewModel);

            return Response(viewModel);
        }
    }
}
