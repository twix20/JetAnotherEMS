using Autofac;
using JetAnotherEMS.Domain.CommandHandlers;
using JetAnotherEMS.Domain.Core.Notifications;
using MediatR;

namespace JetAnotherEMS.Infrastructure.IoC.AutofacModules
{
    public class HandlerModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterAssemblyTypes(typeof(CommandHandler).Assembly)
                .Where(t => t.Name.EndsWith("Handler"))
                .AsImplementedInterfaces();

            builder.RegisterType<DomainNotificationHandler>().As<INotificationHandler<DomainNotification>>().AsSelf().InstancePerLifetimeScope();
        }
    }
}
