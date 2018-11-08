﻿using System.IO;
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

            modelBuilder.Entity<SchoolingEventGalleryFile>();
            modelBuilder.Entity<SchoolingEventDayAttachment>();

            modelBuilder.Entity<UploadedFile>().Property<string>("Discriminator").Metadata.AfterSaveBehavior = PropertySaveBehavior.Save;

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
