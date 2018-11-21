using System;
using System.IO;
using JetAnotherEMS.Domain.Core.Events;
using JetAnotherEMS.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.Configuration;

namespace JetAnotherEMS.Infrastructure.Data.Context
{
    public class EventStoreSQLContext : DbContext
    {
        public DbSet<StoredEvent> StoredEvent { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.ApplyConfiguration(new StoredEventMap());

            base.OnModelCreating(modelBuilder);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // get the configuration from the app settings
            var config = new ConfigurationBuilder()
                .SetBasePath(Path.GetFullPath(@"../JetAnotherEMS.WebApi"))
                .AddJsonFile("appsettings.json")
                .Build();

            var dbConnectionString = Environment.GetEnvironmentVariable("DATABASE_CONNECTION") ?? config.GetConnectionString("DefaultConnection");

            // define the database to use
            optionsBuilder
                .UseLazyLoadingProxies()
                //.UseInMemoryDatabase("EventStoreSQLContext")
                .UseSqlServer(dbConnectionString);

        }
    }
}
