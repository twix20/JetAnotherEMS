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
using Microsoft.AspNetCore.Http.Extensions;
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

            var baseUrl = $"{Request.Scheme}://{Request.Host}";

            await _fileService.SaveFile(vm, filepond.OpenReadStream(), fullTempPathToSave, baseUrl);

            return Content(vm.Id.ToString());
        }

        [HttpGet]
        [Route("{id:guid}/[action]")]
        [AllowAnonymous]
        public async Task<IActionResult> Download(Guid id)
        {
            var fileDb = await _fileService.GetById(id);
            if (fileDb == null)
                return BadRequest();

            var filePath = Path.Combine(fileDb.LocationOnDisk, fileDb.FileName);
            var fileBytes = System.IO.File.ReadAllBytes(filePath);
            var fileName = fileDb.OriginalName;
            var fileType = fileDb.Type;

            return File(fileBytes, fileType, fileName);
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