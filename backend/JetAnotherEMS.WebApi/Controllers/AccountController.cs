using System.Security.Claims;
using System.Threading.Tasks;
using IdentityModel.Client;
using JetAnotherEMS.Domain.Core.Bus;
using JetAnotherEMS.Domain.Core.Notifications;
using JetAnotherEMS.Infrastructure.Identity.Models;
using JetAnotherEMS.Infrastructure.Identity.Models.AccountViewModels;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace JetAnotherEMS.WebApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class AccountController : ApiController
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly ILogger _logger;
        private readonly IConfiguration _configuration;

        public AccountController(
            INotificationHandler<DomainNotification> notifications, 
            IMediatorHandler mediator, 
            UserManager<ApplicationUser> userManager, 
            SignInManager<ApplicationUser> signInManager, 
            ILoggerFactory loggerFactory, 
            IConfiguration configuration) : base(notifications, mediator)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
            _logger = loggerFactory.CreateLogger<AccountController>();
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("[action]")]
        public async Task<IActionResult> Register([FromBody]RegisterViewModel model)
        {
            if (!ModelState.IsValid)
            {
                NotifyModelStateErrors();
                return Response(model);
            }

            var user = new ApplicationUser { UserName = model.Email, Email = model.Email };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                // User claim for write customers data
                await AddRolesAndClaimsToNewUser(user, model);

                await _signInManager.SignInAsync(user, false);
                _logger.LogInformation(3, $"User {user.Email} created a new account with password.");
                return Response(model);
            }

            AddIdentityErrors(result);
            return Response(model);
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("[action]")]
        public async Task<IActionResult> Login([FromBody]LoginViewModel model)
        {
            if (!ModelState.IsValid)
            {
                NotifyModelStateErrors();
                return Response(model);
            }

            var user = await _userManager.FindByEmailAsync(model.Email);

            if (user == null)
                return BadRequest();

            var areCredentialsValid = await _signInManager.PasswordSignInAsync(model.Email, model.Password, model.RememberMe, lockoutOnFailure: false);

            if (!areCredentialsValid.Succeeded)
                return BadRequest();

            var identityServerUrl = _configuration.GetValue<string>("IdentityServer:Url");
            var clientId = _configuration.GetValue<string>("IdentityServer:ClientId");
            var secret = _configuration.GetValue<string>("IdentityServer:Secret");
            var allowedScope = _configuration.GetValue<string>("IdentityServer:AllowedScope");


            _logger.LogWarning("identityServerUrl: " + identityServerUrl);

            var disco = await DiscoveryClient.GetAsync(identityServerUrl);

            _logger.LogWarning(disco.Raw);
            _logger.LogWarning(disco.TokenEndpoint);

            var tokenClient = new TokenClient(disco.TokenEndpoint, clientId, secret);

            var tokenResponse = await tokenClient.RequestResourceOwnerPasswordAsync(model.Email, model.Password, allowedScope);

            return Response(tokenResponse.Json);
        }

        private async Task AddRolesAndClaimsToNewUser(ApplicationUser user, RegisterViewModel model)
        {
            //TODO: get rid of magic strings
            if (model.Type == AccountType.Company)
            {
                await _userManager.AddToRoleAsync(user, "Company");
                await _userManager.AddClaimAsync(user, new Claim("SchoolingEvent", "Create"));
                await _userManager.AddClaimAsync(user, new Claim("SchoolingEvent", "Remove"));
            }
            else if (model.Type == AccountType.User)
            {
                await _userManager.AddToRoleAsync(user, "User");
                await _userManager.AddClaimAsync(user, new Claim("SchoolingEvent", "BuyTicket"));
            }
        }
    }
}