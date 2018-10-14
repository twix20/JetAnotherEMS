using Autofac;
using FluentValidation;
using JetAnotherEMS.Application;
using JetAnotherEMS.Application.Interfaces;
using JetAnotherEMS.Application.Services;
using JetAnotherEMS.Domain.Core.Validation;

namespace JetAnotherEMS.Infrastructure.IoC.AutofacModules
{
    public class ServiceModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterAssemblyTypes(typeof(ISchoolingEventService).Assembly)
                .Where(t => t.Name.EndsWith("Service"))
                .AsImplementedInterfaces();

            // Validation
            builder.RegisterType<FluentValidationService>().As<IValidationService>().InstancePerRequest();
            builder.RegisterType<AutofacValidatorFactory>().As<IValidatorFactory>().InstancePerRequest();
        }
    }
}
