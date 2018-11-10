using Autofac;
using JetAnotherEMS.Application.Interfaces;

namespace JetAnotherEMS.Infrastructure.IoC.AutofacModules
{
    public class ServiceModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterAssemblyTypes(typeof(ISchoolingEventService).Assembly)
                .Where(t => t.Name.EndsWith("Service"))
                .AsImplementedInterfaces();
        }
    }
}
