using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using JetAnotherEMS.Application.Interfaces;
using JetAnotherEMS.Application.ViewModels;
using JetAnotherEMS.Domain.Core.Bus;
using JetAnotherEMS.Domain.Core.Notifications;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RequestSizeLimitAttribute = JetAnotherEMS.WebApi.Attributes.RequestSizeLimitAttribute;

namespace JetAnotherEMS.WebApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class FileController : ApiController
    {
        private readonly IFileService _fileService;
        private readonly IHostingEnvironment _environment;

        public FileController(
            INotificationHandler<DomainNotification> notifications, 
            IMediatorHandler mediator, 
            IFileService fileService, 
            IHostingEnvironment environment) : base(notifications, mediator)
        {
            _fileService = fileService;
            _environment = environment;
        }

        [HttpPost]
        [Route("[action]")]
        [RequestSizeLimit(5 * 1000 * 1000)] //5mb
        [AllowAnonymous]
        public async Task<IActionResult> Upload(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest();

            //TODO: move to config
            var fullTempPathToSave = Path.Combine(_environment.WebRootPath, "uploads");

            var vm = Mapper.Map<UploadedFileViewModel>(file);
            vm.LocationOnDisk = fullTempPathToSave;

            await _fileService.SaveFile(vm, file.OpenReadStream(), fullTempPathToSave);

            return Response(new { vm });
        }
    }
}