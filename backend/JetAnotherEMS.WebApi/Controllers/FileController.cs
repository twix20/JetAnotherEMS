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

        [HttpGet]
        [Route("[action]/{id:guid}")]
        [AllowAnonymous]
        public async Task<IActionResult> Load(Guid id)
        {
            var file = await _fileService.GetById(id);
            if (file == null)
                return BadRequest();

            return Ok(new
            {
                id = file.Id,
                name = file.OriginalName,
                typ = "image/png",
                size = file.Length,
            });
        }



        [HttpPost]
        [Route("[action]")]
        [RequestSizeLimit(5 * 1000 * 1000)] //5mb
        [AllowAnonymous]
        public async Task<IActionResult> Upload(IFormFile filepond)
        {
            if (filepond == null || filepond.Length == 0)
                return BadRequest();

            //TODO: move to config
            //TODO: move to command handler
            var fullTempPathToSave = Path.Combine(_environment.WebRootPath, "uploads");

            var vm = Mapper.Map<UploadedFileViewModel>(filepond);
            vm.Id = Guid.NewGuid();
            vm.LocationOnDisk = fullTempPathToSave;

            await _fileService.SaveFile(vm, filepond.OpenReadStream(), fullTempPathToSave);

            return Content(vm.Id.ToString());
        }

        [HttpDelete]
        [AllowAnonymous]
        public async Task<IActionResult> Delete()
        {
            using (var stream = new StreamReader(HttpContext.Request.Body))
            {
                var body = stream.ReadToEnd();

                var id = Guid.Parse(body);

                await _fileService.DeleteFile(id);

                return Response(new { id });
            }
        }
    }
}