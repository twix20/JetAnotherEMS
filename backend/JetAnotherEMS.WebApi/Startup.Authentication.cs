using System.IO;
using IdentityServer4.Configuration;
using JetAnotherEMS.Infrastructure.Identity;
using JetAnotherEMS.Infrastructure.Identity.Data;
using JetAnotherEMS.Infrastructure.Identity.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace JetAnotherEMS.WebApi
{
    public partial class Startup
    {
        public void AddAuthentication(IServiceCollection services)
        {
            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            services.Configure<IdentityOptions>(options =>
            {
                options.Password.RequireDigit = false;
                options.Password.RequireLowercase = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
                options.Password.RequiredLength = 1;
                options.Password.RequiredUniqueChars = 1;
            });

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.Authority = Configuration.GetValue<string>("IdentityServer:Url");
                options.RequireHttpsMetadata = false;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    NameClaimType = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier",
                    ValidateAudience = true,
                    ValidAudiences = new[]
                    {
                        "api1"
                    },
                };
            });

            // Can be moved to future separate identity server
            // configure identity server with in-memory stores, keys, clients and scopes
            var path = Path.Combine(Path.GetFullPath("./Certificates"), "jetanotherems.pfx");
            services.AddIdentityServer()
                //.AddSigningCredential(new X509Certificate2(path)) //TOOD: change in production
                .AddDeveloperSigningCredential(true)
                .AddInMemoryPersistedGrants()
                .AddInMemoryIdentityResources(Config.GetIdentityResources())
                .AddInMemoryApiResources(Config.GetApiResources())
                .AddInMemoryClients(Config.GetClients())
                .AddAspNetIdentity<ApplicationUser>()
                .AddProfileService<ProfileService>();
        }
    }
}
