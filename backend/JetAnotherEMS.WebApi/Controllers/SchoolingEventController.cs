using System;
using System.Threading.Tasks;
using AutoMapper;
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
    [Route("api/[controller]")]
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
        [Route("[action]")]
        public async Task<IActionResult> Featured(int page = 0, int pageSize = 10)
        {
            var entities = await _schoolingEventService.GetFeaturedEvents(page, pageSize);

            return Response(entities);
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("{id:guid}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var featured = await _schoolingEventService.GetFeaturedById(id);
            if (featured == null) return BadRequest();

            return Response(featured);
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("[action]/{id:guid}")]
        public async Task<IActionResult> Schedule(Guid id)
        {
            var schedule = await _schoolingEventService.GetSchedule(id);
            if (schedule == null) return BadRequest();

            return Response(schedule);
        }

        [HttpPost]
        [Authorize(Policy = "CanCreateSchoolingEvent")]
        public async Task<IActionResult> Post([FromBody]FeaturedSchoolingEventViewModel viewModel)
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
