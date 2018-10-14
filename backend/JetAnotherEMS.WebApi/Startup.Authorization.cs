using JetAnotherEMS.Infrastructure.Identity.Authorization;
using Microsoft.Extensions.DependencyInjection;

namespace JetAnotherEMS.WebApi
{
    public partial class Startup
    {
        public void AddAuthorization(IServiceCollection services)
        {
            services.AddAuthorization(options =>
            {
                options.AddPolicy("CanCreateSchoolingEvent", policy => policy.Requirements.Add(new ClaimRequirement("SchoolingEvent", "Create")));
                options.AddPolicy("CanRemoveSchoolingEvent", policy => policy.Requirements.Add(new ClaimRequirement("SchoolingEvent", "Remove")));
            });
        }
    }
}
