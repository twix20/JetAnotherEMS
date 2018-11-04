using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JetAnotherEMS.Application.Interfaces;
using JetAnotherEMS.Domain.Core.Bus;
using JetAnotherEMS.Domain.Core.Notifications;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace JetAnotherEMS.WebApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class TagsController : ApiController
    {
        private readonly ISchoolingEventDayTagService _schoolingEventDayTagService;

        public TagsController(
            INotificationHandler<DomainNotification> notifications, 
            IMediatorHandler mediator, ISchoolingEventDayTagService schoolingEventDayTagService) : base(notifications, mediator)
        {
            _schoolingEventDayTagService = schoolingEventDayTagService;
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("[action]")]
        public async Task<IActionResult> Search(string query)
        {
            var result = await _schoolingEventDayTagService.Search(query);

            return Response(result);
        }
    }
}
