using System;
using System.IO;
using JetAnotherEMS.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace JetAnotherEMS.Infrastructure.Data.Context
{
    public class JetAnotherEmsContext : DbContext
    {
        public DbSet<SchoolingEvent> SchoolingEvents { get; set; }
        public DbSet<SchoolingEventDay> SchoolingEventDays { get; set; }
        public DbSet<SchoolingEventFollower> SchoolingEventFollowers { get; set; }
        public DbSet<SchoolingEventDayAttachment> SchoolingEventDayAttachments { get; set; }
        public DbSet<SchoolingEventDayTag> SchoolingEventDayTags { get; set; }
        public DbSet<SchoolingEventTicket> SchoolingEventTickets { get; set; }
        public DbSet<UserSchoolingEventTicket> UserSchoolingEventTickets { get; set; }
        public DbSet<GoogleMapsAddress> GoogleMapsAddresses { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.ApplyConfiguration(new CustomerMap());

            modelBuilder.Entity<SchoolingEvent>().HasData(new SchoolingEvent()
            {
                Id = Guid.Parse("f9d6f596-b4af-40f0-8520-6f2e124c085d"),
                Title = "Seed title",
                Description = "Seed description",
            });

            base.OnModelCreating(modelBuilder);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // get the configuration from the app settings
            var config = new ConfigurationBuilder()
                .SetBasePath(Path.GetFullPath(@"../JetAnotherEMS.WebApi"))
                .AddJsonFile("appsettings.json")
                .Build();

            // define the database to use
            optionsBuilder.UseSqlServer(config.GetConnectionString("DefaultConnection"));
        }

    }
}
