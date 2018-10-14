using Autofac;
using JetAnotherEMS.Domain.CommandHandlers;
using JetAnotherEMS.Domain.Core.Bus;
using JetAnotherEMS.Domain.Interfaces;
using JetAnotherEMS.Infrastructure.Bus;
using JetAnotherEMS.Infrastructure.Data.UnitOfWork;
using JetAnotherEMS.Infrastructure.Identity.Models;
using MediatR.Extensions.Autofac.DependencyInjection;

namespace JetAnotherEMS.Infrastructure.IoC.AutofacModules
{
    public class InfrastructureModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            // Domain Bus (Mediator)
            builder.RegisterType<InMemoryBus>().As<IMediatorHandler>();

            // Infra - Data
            builder.RegisterType<UnitOfWork>().As<IUnitOfWork>();

            // Infra - Identity
            builder.RegisterType<AspNetUser>().As<IUser>();

            builder.AddMediatR(typeof(CommandHandler).Assembly);
        }
    }
}
