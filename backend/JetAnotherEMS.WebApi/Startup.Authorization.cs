using Autofac;
using JetAnotherEMS.Infrastructure.Identity.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;

namespace JetAnotherEMS.WebApi
{
    public partial class Startup
    {
        public void AddAuthorization(IServiceCollection services)
        {
            services.AddAuthorization(options =>
            {
                options.AddPolicy("CanCreateSchoolingEvent", policy =>
                {
                    policy.RequireRole("Company");
                    policy.Requirements.Add(new ClaimRequirement("SchoolingEvent", "Create"));
                });
                options.AddPolicy("CanRemoveSchoolingEvent", policy =>
                {
                    policy.RequireRole("Company");
                    policy.Requirements.Add(new ClaimRequirement("SchoolingEvent", "Remove"));
                });
            });
        }

        public void CreateRoles(ILifetimeScope scope)
        {
            string[] roleNames = {"User", "Company"};

            foreach (var roleName in roleNames)
            {
                CreateRole(scope, roleName);
            }
        }

        private void CreateRole(IComponentContext scope, string roleName)
        {
            var roleManager = scope.Resolve<RoleManager<IdentityRole>>();

            var roleExists = roleManager.RoleExistsAsync(roleName);
            roleExists.Wait();

            if (!roleExists.Result)
            {
                var roleResult = roleManager.CreateAsync(new IdentityRole(roleName));
                roleResult.Wait();
            }
        }
        
    }
}
