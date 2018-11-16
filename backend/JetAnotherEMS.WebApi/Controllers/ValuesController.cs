using System.Collections.Generic;
using System.Linq;
using JetAnotherEMS.Infrastructure.Data.Context;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace JetAnotherEMS.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private readonly JetAnotherEmsContext _context;
        private readonly IHostingEnvironment _env;

        public ValuesController(JetAnotherEmsContext context, IHostingEnvironment env)
        {
            _context = context;
            _env = env;
        }

        [HttpGet]
        [Route("/Seed")]
        public ActionResult<IEnumerable<string>> Seed()
        {
            var baseUrl = $"{Request.Scheme}://{Request.Host}";

            if(!_context.SchoolingEvents.Any())
                _context.Seed(_env, baseUrl);

            return Ok();
        }

        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<string>> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
