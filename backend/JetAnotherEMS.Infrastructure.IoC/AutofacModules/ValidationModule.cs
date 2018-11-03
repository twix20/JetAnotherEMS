using Autofac;
using FluentValidation;
using JetAnotherEMS.Application;
using JetAnotherEMS.Application.Services;
using JetAnotherEMS.Domain.Commands.SchoolingEvent;
using JetAnotherEMS.Domain.Core.Validation;
using JetAnotherEMS.Domain.Validation;

namespace JetAnotherEMS.Infrastructure.IoC.AutofacModules
{
    public class ValidationModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterAssemblyTypes(typeof(BuyEventTicketCommandValidator).Assembly)
                .Where(t => t.Name.EndsWith("Validator"))
                .AsSelf()
                .AsImplementedInterfaces();



            // Validation
            builder.RegisterType<FluentValidationService>().As<IValidationService>();
            builder.RegisterType<AutofacValidatorFactory>().As<IValidatorFactory>().AsSelf();
        }
    }
}
