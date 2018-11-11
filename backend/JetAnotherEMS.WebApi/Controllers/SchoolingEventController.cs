using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Ical.Net.Serialization;
using JetAnotherEMS.Application.Interfaces;
using JetAnotherEMS.Application.ViewModels;
using JetAnotherEMS.Domain.Core.Bus;
using JetAnotherEMS.Domain.Core.Notifications;
using JetAnotherEMS.Domain.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JetAnotherEMS.WebApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class SchoolingEventController : ApiController
    {
        private readonly ISchoolingEventService _schoolingEventService;
        private readonly DomainNotificationHandler _notifications;

        public SchoolingEventController(
            INotificationHandler<DomainNotification> notifications, 
            IMediatorHandler mediator,
            ISchoolingEventService schoolingEventService, 
            ISchoolingEventGalleryFileRepository eventGalleryFileRepository) : base(notifications, mediator)
        {
            _notifications = (DomainNotificationHandler) notifications;
            _schoolingEventService = schoolingEventService;
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("{id:guid}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var vm = await _schoolingEventService.GetById(id);

            return Response(vm);
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("[action]")]
        //TODO: sort by
        //TODO: pagination
        public async Task<IActionResult> Featured(SchoolingEventFilterViewModel filter, SchoolingEventSortType sort, int page = 0, int pageSize = 10)
        {
            var entities = await _schoolingEventService.GetFeaturedEvents(filter, sort, page, pageSize);

            return Response(entities);
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("{id:guid}/[action]")]
        public async Task<IActionResult> Tickets(Guid id)
        {
            var tickets = await _schoolingEventService.GetTickets(id);

            return Response(tickets);
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("{id:guid}/[action]")]
        public async Task<IActionResult> Schedule(Guid id)
        {
            var schedule = await _schoolingEventService.GetSchedule(id);

            return Response(schedule);
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("{id:guid}/[action]")]
        public async Task<IActionResult> Participants(Guid id)
        {
            //TODO: only creator of an event can see participiants
            var participants = await _schoolingEventService.GetParticipants(id);

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

            viewModel.Id = Guid.NewGuid();

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

        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> ChangeSchoolingEventFollow([FromBody] ChangeFollowSchoolingEventViewModel viewModel)
        {
            if (!ModelState.IsValid)
            {
                NotifyModelStateErrors();
                return Response(viewModel);
            }

            await _schoolingEventService.ChangeSchoolingEventFollow(viewModel);

            return Response(viewModel);
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("{id:guid}/[action]")]
        public async Task<IActionResult> DownloadAllAttachments(Guid id)
        {
            var packageStream = await _schoolingEventService.CompressAllAttachmentsToZipForEvent(id);

            if (IsValidOperation())
            {
                return File(packageStream.ToArray(), "application/octet-stream", $"{id}_attachments.zip");
            }

            return BadRequest(new
            {
                success = false,
                errors = _notifications.GetNotifications().Select(n => n.Value)
            });
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("{id:guid}/[action]")]
        public async Task<IActionResult> Calendar(Guid id)
        {
            var calendar = await _schoolingEventService.GenerateCalendar(id);

            if (IsValidOperation())
            {
                var serializer = new CalendarSerializer(calendar);
                var serializedCalendar = serializer.SerializeToString();
                var calendarBytes = Encoding.ASCII.GetBytes(serializedCalendar);

                return File(calendarBytes, "application/octet-stream", $"{id}_calendar.iCal");
            }

            return BadRequest(new
            {
                success = false,
                errors = _notifications.GetNotifications().Select(n => n.Value)
            });
        }




    }
}
