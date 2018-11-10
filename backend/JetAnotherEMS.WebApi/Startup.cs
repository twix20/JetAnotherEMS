using System;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using JetAnotherEMS.Infrastructure.Data.Context;
using JetAnotherEMS.Infrastructure.Identity.Authorization;
using JetAnotherEMS.Infrastructure.Identity.Data;
using JetAnotherEMS.Infrastructure.IoC;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Swashbuckle.AspNetCore.Swagger;

namespace JetAnotherEMS.WebApi
{
    public partial class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IContainer ApplicationContainer { get; private set; }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            services.AddCors();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info { Title = "JetAnotherEMS API", Version = "v1" });
            });

            AddAutoMapperSetup(services);
            AddAuthorization(services);
            AddAuthentication(services);

            var builder = new ContainerBuilder();
            builder.RegisterType<HttpContextAccessor>().As<IHttpContextAccessor>();
            builder.RegisterType<ClaimsRequirementHandler>().As<IAuthorizationHandler>();

            builder.Populate(services);
            AutofacBootStrapper.RegisterServices(builder);

            // DB Contexts
            builder.RegisterType<ApplicationContextDbFactory>().AsSelf().AsImplementedInterfaces();

            builder.RegisterType<EventStoreSQLContext>().InstancePerLifetimeScope();
            builder.RegisterType<JetAnotherEmsContext>().InstancePerLifetimeScope();

            builder.RegisterType<ApplicationContextDbFactory>().AsSelf().AsImplementedInterfaces();
            builder.Register<ApplicationDbContext>(ctx =>
            {
                var factory = ctx.Resolve<IDesignTimeDbContextFactory<ApplicationDbContext>>();
                return factory.CreateDbContext(new string[] { });
            }).InstancePerLifetimeScope();

            ApplicationContainer = builder.Build();

            return new AutofacServiceProvider(this.ApplicationContainer);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, ILoggerFactory loggerFactory, IServiceProvider serviceProvider, IHostingEnvironment env)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseStaticFiles();

            app.UseAuthentication();

            app.UseIdentityServer();

            app.UseCors(
                options =>
                {
                    options
                        .AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials();
                });

            app.UseHttpsRedirection();
            app.UseMvc();

            app.UseSwagger();
            app.UseSwaggerUI(s =>
            {
                s.SwaggerEndpoint("/swagger/v1/swagger.json", "JetAnotherEMS Project API v1");
            });


            using (var scope = ApplicationContainer.BeginLifetimeScope("AutofacWebRequest"))
            {
                CreateRoles(scope);
            }
        }
    }
}
