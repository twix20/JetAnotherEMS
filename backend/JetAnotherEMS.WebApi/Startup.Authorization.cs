using System;
using System.Threading.Tasks;
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

        public void CreateRoles(IServiceProvider serviceProvider)
        {
            string[] roleNames = {"User", "Company"};

            foreach (var roleName in roleNames)
            {
                CreateRole(serviceProvider, roleName);
            }
        }

        private void CreateRole(IServiceProvider serviceProvider, string roleName)
        {
            var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();

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
