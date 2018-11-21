using System;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.IO;
using JetAnotherEMS.Infrastructure.Identity.Models;
using Microsoft.EntityFrameworkCore.Design;

namespace JetAnotherEMS.Infrastructure.Identity.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
    }
    public class ApplicationContextDbFactory : IDesignTimeDbContextFactory<ApplicationDbContext>
    {
        ApplicationDbContext IDesignTimeDbContextFactory<ApplicationDbContext>.CreateDbContext(string[] args)
        {
            // get the configuration from the app settings
            var config = new ConfigurationBuilder()
                .SetBasePath(Path.GetFullPath(@"../JetAnotherEMS.WebApi"))
                .AddJsonFile("appsettings.json")
                .Build();

            var dbConnectionString = Environment.GetEnvironmentVariable("DATABASE_CONNECTION") ?? config.GetConnectionString("DefaultConnection");

            var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();
            optionsBuilder
                .UseLazyLoadingProxies()
                //    .UseInMemoryDatabase("ApplicationDbContext");
                .UseSqlServer(dbConnectionString);

            return new ApplicationDbContext(optionsBuilder.Options);
        }
    }
}
