using Autofac;

namespace JetAnotherEMS.Infrastructure.IoC
{
    public class AutofacBootStrapper
    {
        public static ContainerBuilder RegisterServices(ContainerBuilder builder)
        {

            builder.RegisterAssemblyModules(typeof(AutofacBootStrapper).Assembly);

            return builder;
        }
    }
}
