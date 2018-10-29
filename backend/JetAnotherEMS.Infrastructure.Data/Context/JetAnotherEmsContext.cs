using JetAnotherEMS.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.IO;

namespace JetAnotherEMS.Infrastructure.Data.Context
{
    public class JetAnotherEmsContext : DbContext
    {
        public DbSet<SchoolingEvent> SchoolingEvents { get; set; }
        public DbSet<SchoolingEventAddress> SchoolingEventAddresses { get; set; }
        public DbSet<SchoolingEventDay> SchoolingEventDays { get; set; }
        public DbSet<SchoolingEventFollower> SchoolingEventFollowers { get; set; }
        public DbSet<SchoolingEventDayAttachment> SchoolingEventDayAttachments { get; set; }
        public DbSet<SchoolingEventDayTag> SchoolingEventDayTags { get; set; }
        public DbSet<SchoolingEventTicket> SchoolingEventTickets { get; set; }
        public DbSet<UserSchoolingEventTicket> UserSchoolingEventTickets { get; set; }
        public DbSet<GoogleMapsAddress> GoogleMapsAddresses { get; set; }
        public DbSet<UploadedFile> UploadedFiles { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.ApplyConfiguration(new CustomerMap());

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
            optionsBuilder
                .UseLazyLoadingProxies()
                .UseSqlServer(config.GetConnectionString("DefaultConnection"));
        }

    }
}
