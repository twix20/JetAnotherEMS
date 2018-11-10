using JetAnotherEMS.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using JetAnotherEMS.Domain.Core.Models;
using JetAnotherEMS.Domain.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore.Metadata;

namespace JetAnotherEMS.Infrastructure.Data.Context
{
    public class JetAnotherEmsContext : DbContext
    {
        private readonly IUser _user;

        public DbSet<SchoolingEvent> SchoolingEvents { get; set; }
        public DbSet<SchoolingEventGalleryFile> SchoolingEventGalleryFiles { get; set; }
        public DbSet<SchoolingEventAddress> SchoolingEventAddresses { get; set; }
        public DbSet<SchoolingEventDay> SchoolingEventDays { get; set; }
        public DbSet<SchoolingEventDayAttachment> SchoolingEventDayAttachments { get; set; }
        public DbSet<SchoolingEventDayTag> SchoolingEventDayTags { get; set; }
        public DbSet<SchoolingEventFollower> SchoolingEventFollowers { get; set; }
        public DbSet<SchoolingEventTicket> SchoolingEventTickets { get; set; }
        public DbSet<UserSchoolingEventTicket> UserSchoolingEventTickets { get; set; }
        public DbSet<GoogleMapsAddress> GoogleMapsAddresses { get; set; }
        public DbSet<UploadedFile> UploadedFiles { get; set; }

        public JetAnotherEmsContext()
            : base()
        {
        }

        public JetAnotherEmsContext(IUser user)
            
        {
            _user = user;
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.ApplyConfiguration(new CustomerMap());

            modelBuilder.Entity<SchoolingEventDayAttachment>();
            modelBuilder.Entity<SchoolingEventGalleryFile>();

            modelBuilder.Entity<UploadedFile>().Property<string>("Discriminator").Metadata.AfterSaveBehavior = PropertySaveBehavior.Save;

            modelBuilder.Entity<SchoolingEventDay>()
                .HasMany(d => d.Tags)
                .WithOne(x => x.EventDay)
                .OnDelete(DeleteBehavior.Cascade);

            base.OnModelCreating(modelBuilder);
        }

        public override int SaveChanges()
        {
            AddTimestamps();
            return base.SaveChanges();
        }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default(CancellationToken))
        {
            AddTimestamps();
            return await base.SaveChangesAsync(cancellationToken);
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
                .UseSqlServer(dbConnectionString);
        }

        private void AddTimestamps()
        {
            var entities = ChangeTracker.Entries().Where(x =>
                x.Entity is Entity && (x.State == EntityState.Added || x.State == EntityState.Modified));

            var currentUserId = Guid.Empty;
            try
            {
                currentUserId = _user.Id;
            }
            catch (NullReferenceException)
            {
            }

            foreach (var entity in entities)
            {
                var entityBase = (Entity) entity.Entity;

                if (entity.State == EntityState.Added)
                {
                    entityBase.CreatedAt = DateTime.UtcNow;
                    entityBase.CreatedByUserId = currentUserId;
                }

                entityBase.UpdatedAt = DateTime.UtcNow;
                entityBase.UpdatedByUserId = currentUserId;
            }
        }
    }
}
