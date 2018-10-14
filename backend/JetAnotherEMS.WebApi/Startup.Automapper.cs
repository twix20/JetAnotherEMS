using System;
using AutoMapper;
using JetAnotherEMS.Application.AutoMapper;
using Microsoft.Extensions.DependencyInjection;

namespace JetAnotherEMS.WebApi
{
    public partial class Startup
    {
        public void AddAutoMapperSetup(IServiceCollection services)
        {
            if (services == null) throw new ArgumentNullException(nameof(services));

            services.AddAutoMapper();

            // Registering Mappings automatically only works if the 
            // Automapper Profile classes are in ASP.NET project
            AutoMapperConfig.RegisterMappings();
        }
    }
}
