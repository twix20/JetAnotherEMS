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
        public async Task<IActionResult> Featured(SchoolingEventFilterViewModel filter, int page = 0, int pageSize = 10)
        {
            var entities = await _schoolingEventService.GetFeaturedEvents(filter, page, pageSize);

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
        [Route("{id:guid}/[action]")]
        public async Task<IActionResult> Schedule(Guid id)
        {
            var schedule = await _schoolingEventService.GetSchedule(id);
            if (schedule == null) return BadRequest();

            return Response(schedule);
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("{id:guid}/[action]")]
        public async Task<IActionResult> Participants(Guid id)
        {
            //TODO: only creator of an event can see participiants
            var participants = await _schoolingEventService.GetParticipants(id);
            if (participants == null) return BadRequest();

            return Response(participants);
        }

        [HttpPost]
        [AllowAnonymous]
        //[Authorize(Policy = "CanCreateSchoolingEvent")]
        public async Task<IActionResult> Post([FromBody]CreateSchoolingEventViewModel viewModel)
        {
            if (!ModelState.IsValid)
            {
                NotifyModelStateErrors();
                return Response(viewModel);
            }

            await _schoolingEventService.Create(viewModel);

            return Response(viewModel);
        }

        [HttpPatch]
        [AllowAnonymous]
        //[Authorize(Policy = "CanUpdateSchoolingEvent")]
        public async Task<IActionResult> Patch([FromBody]UpdateSchoolingEventViewModel viewModel)
        {
            if (!ModelState.IsValid)
            {
                NotifyModelStateErrors();
                return Response(viewModel);
            }

            await _schoolingEventService.Update(viewModel);

            return Response(viewModel);
        }
    }
}
