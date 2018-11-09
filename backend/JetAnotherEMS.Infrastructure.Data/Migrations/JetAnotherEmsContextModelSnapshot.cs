﻿// <auto-generated />
using System;
using JetAnotherEMS.Infrastructure.Data.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace JetAnotherEMS.Infrastructure.Data.Migrations
{
    [DbContext(typeof(JetAnotherEmsContext))]
    partial class JetAnotherEmsContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.4-rtm-31024")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("JetAnotherEMS.Domain.Models.GoogleMapsAddress", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedAt");

                    b.Property<Guid>("CreatedByUserId");

                    b.Property<string>("Description");

                    b.Property<string>("Discriminator")
                        .IsRequired();

                    b.Property<float>("Lat");

                    b.Property<float>("Lng");

                    b.Property<DateTime>("UpdatedAt");

                    b.Property<Guid>("UpdatedByUserId");

                    b.HasKey("Id");

                    b.ToTable("GoogleMapsAddresses");

                    b.HasDiscriminator<string>("Discriminator").HasValue("GoogleMapsAddress");
                });

            modelBuilder.Entity("JetAnotherEMS.Domain.Models.SchoolingEvent", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedAt");

                    b.Property<Guid>("CreatedByUserId");

                    b.Property<string>("Description");

                    b.Property<bool>("IsPublic");

                    b.Property<string>("Title");

                    b.Property<DateTime>("UpdatedAt");

                    b.Property<Guid>("UpdatedByUserId");

                    b.HasKey("Id");

                    b.ToTable("SchoolingEvents");
                });

            modelBuilder.Entity("JetAnotherEMS.Domain.Models.SchoolingEventDay", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedAt");

                    b.Property<Guid>("CreatedByUserId");

                    b.Property<string>("Description");

                    b.Property<DateTime>("End");

                    b.Property<Guid?>("EventId");

                    b.Property<string>("LectureRoom");

                    b.Property<DateTime>("Start");

                    b.Property<string>("Teacher");

                    b.Property<string>("Title");

                    b.Property<DateTime>("UpdatedAt");

                    b.Property<Guid>("UpdatedByUserId");

                    b.HasKey("Id");

                    b.HasIndex("EventId");

                    b.ToTable("SchoolingEventDays");
                });

            modelBuilder.Entity("JetAnotherEMS.Domain.Models.SchoolingEventDayTag", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedAt");

                    b.Property<Guid>("CreatedByUserId");

                    b.Property<string>("Description");

                    b.Property<Guid?>("EventId");

                    b.Property<Guid?>("SchoolingEventDayId");

                    b.Property<DateTime>("UpdatedAt");

                    b.Property<Guid>("UpdatedByUserId");

                    b.Property<string>("Value");

                    b.HasKey("Id");

                    b.HasIndex("EventId");

                    b.HasIndex("SchoolingEventDayId");

                    b.ToTable("SchoolingEventDayTags");
                });

            modelBuilder.Entity("JetAnotherEMS.Domain.Models.SchoolingEventFollower", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedAt");

                    b.Property<Guid>("CreatedByUserId");

                    b.Property<Guid?>("EventId");

                    b.Property<DateTime>("UpdatedAt");

                    b.Property<Guid>("UpdatedByUserId");

                    b.Property<Guid>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("EventId");

                    b.ToTable("SchoolingEventFollowers");
                });

            modelBuilder.Entity("JetAnotherEMS.Domain.Models.SchoolingEventTicket", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedAt");

                    b.Property<Guid>("CreatedByUserId");

                    b.Property<string>("Currency")
                        .IsRequired();

                    b.Property<Guid>("EventId");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.Property<decimal>("Price");

                    b.Property<long>("TotalQuantity");

                    b.Property<DateTime>("UpdatedAt");

                    b.Property<Guid>("UpdatedByUserId");

                    b.HasKey("Id");

                    b.HasIndex("EventId");

                    b.ToTable("SchoolingEventTickets");
                });

            modelBuilder.Entity("JetAnotherEMS.Domain.Models.UploadedFile", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedAt");

                    b.Property<Guid>("CreatedByUserId");

                    b.Property<string>("Discriminator")
                        .IsRequired();

                    b.Property<string>("FileName");

                    b.Property<string>("LocationOnDisk");

                    b.Property<string>("OriginalName");

                    b.Property<long>("Size");

                    b.Property<DateTime>("UpdatedAt");

                    b.Property<Guid>("UpdatedByUserId");

                    b.Property<string>("WebUrl");

                    b.HasKey("Id");

                    b.ToTable("UploadedFiles");

                    b.HasDiscriminator<string>("Discriminator").HasValue("UploadedFile");
                });

            modelBuilder.Entity("JetAnotherEMS.Domain.Models.UserSchoolingEventTicket", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedAt");

                    b.Property<Guid>("CreatedByUserId");

                    b.Property<Guid?>("SchoolingEventId");

                    b.Property<int>("Status");

                    b.Property<Guid?>("TicketId");

                    b.Property<DateTime>("UpdatedAt");

                    b.Property<Guid>("UpdatedByUserId");

                    b.Property<Guid>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("SchoolingEventId");

                    b.HasIndex("TicketId");

                    b.ToTable("UserSchoolingEventTickets");
                });

            modelBuilder.Entity("JetAnotherEMS.Domain.Models.SchoolingEventAddress", b =>
                {
                    b.HasBaseType("JetAnotherEMS.Domain.Models.GoogleMapsAddress");

                    b.Property<Guid>("EventId");

                    b.HasIndex("EventId")
                        .IsUnique()
                        .HasFilter("[EventId] IS NOT NULL");

                    b.ToTable("SchoolingEventAddress");

                    b.HasDiscriminator().HasValue("SchoolingEventAddress");
                });

            modelBuilder.Entity("JetAnotherEMS.Domain.Models.SchoolingEventDayAttachment", b =>
                {
                    b.HasBaseType("JetAnotherEMS.Domain.Models.UploadedFile");

                    b.Property<Guid?>("SchoolingEventDayId");

                    b.HasIndex("SchoolingEventDayId");

                    b.ToTable("SchoolingEventDayAttachment");

                    b.HasDiscriminator().HasValue("SchoolingEventDayAttachment");
                });

            modelBuilder.Entity("JetAnotherEMS.Domain.Models.SchoolingEventGalleryFile", b =>
                {
                    b.HasBaseType("JetAnotherEMS.Domain.Models.UploadedFile");

                    b.Property<Guid>("EventId");

                    b.HasIndex("EventId");

                    b.ToTable("SchoolingEventGalleryFile");

                    b.HasDiscriminator().HasValue("SchoolingEventGalleryFile");
                });

            modelBuilder.Entity("JetAnotherEMS.Domain.Models.SchoolingEventDay", b =>
                {
                    b.HasOne("JetAnotherEMS.Domain.Models.SchoolingEvent", "Event")
                        .WithMany("Schedule")
                        .HasForeignKey("EventId");
                });

            modelBuilder.Entity("JetAnotherEMS.Domain.Models.SchoolingEventDayTag", b =>
                {
                    b.HasOne("JetAnotherEMS.Domain.Models.SchoolingEvent", "Event")
                        .WithMany()
                        .HasForeignKey("EventId");

                    b.HasOne("JetAnotherEMS.Domain.Models.SchoolingEventDay")
                        .WithMany("Tags")
                        .HasForeignKey("SchoolingEventDayId");
                });

            modelBuilder.Entity("JetAnotherEMS.Domain.Models.SchoolingEventFollower", b =>
                {
                    b.HasOne("JetAnotherEMS.Domain.Models.SchoolingEvent", "Event")
                        .WithMany("Followers")
                        .HasForeignKey("EventId");
                });

            modelBuilder.Entity("JetAnotherEMS.Domain.Models.SchoolingEventTicket", b =>
                {
                    b.HasOne("JetAnotherEMS.Domain.Models.SchoolingEvent", "Event")
                        .WithMany("AvailableTickets")
                        .HasForeignKey("EventId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("JetAnotherEMS.Domain.Models.UserSchoolingEventTicket", b =>
                {
                    b.HasOne("JetAnotherEMS.Domain.Models.SchoolingEvent")
                        .WithMany("ParticipantsTickets")
                        .HasForeignKey("SchoolingEventId");

                    b.HasOne("JetAnotherEMS.Domain.Models.SchoolingEventTicket", "Ticket")
                        .WithMany()
                        .HasForeignKey("TicketId");
                });

            modelBuilder.Entity("JetAnotherEMS.Domain.Models.SchoolingEventAddress", b =>
                {
                    b.HasOne("JetAnotherEMS.Domain.Models.SchoolingEvent", "Event")
                        .WithOne("Location")
                        .HasForeignKey("JetAnotherEMS.Domain.Models.SchoolingEventAddress", "EventId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("JetAnotherEMS.Domain.Models.SchoolingEventDayAttachment", b =>
                {
                    b.HasOne("JetAnotherEMS.Domain.Models.SchoolingEventDay", "SchoolingEventDay")
                        .WithMany("Attachments")
                        .HasForeignKey("SchoolingEventDayId");
                });

            modelBuilder.Entity("JetAnotherEMS.Domain.Models.SchoolingEventGalleryFile", b =>
                {
                    b.HasOne("JetAnotherEMS.Domain.Models.SchoolingEvent", "Event")
                        .WithMany("Gallery")
                        .HasForeignKey("EventId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
