using Autofac;
using JetAnotherEMS.Domain.Core.Events;
using JetAnotherEMS.Infrastructure.Data.Context;
using JetAnotherEMS.Infrastructure.Data.EventSourcing;
using JetAnotherEMS.Infrastructure.Data.Repository;
using JetAnotherEMS.Infrastructure.Data.Repository.EventSourcing;
using JetAnotherEMS.Infrastructure.Identity.Data;

namespace JetAnotherEMS.Infrastructure.IoC.AutofacModules
{
    public class RepositoryModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterAssemblyTypes(typeof(EntityFrameworkRepository<>).Assembly)
                .Where(t => t.Name.EndsWith("Repository"))
                .AsImplementedInterfaces();

            // Infra - Data EventSourcing
            builder.RegisterType<EventStoreSQLRepository>().As<IEventStoreRepository>();
            builder.RegisterType<SqlEventStore>().As<IEventStore>();

            // DB Contexts
            builder.RegisterType<ApplicationContextDbFactory>().AsSelf().AsImplementedInterfaces();

            builder.RegisterType<EventStoreSQLContext>();
            builder.RegisterType<JetAnotherEmsContext>();
            builder.RegisterType<ApplicationDbContext>();
        }
    }
}
