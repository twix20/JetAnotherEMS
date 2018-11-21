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

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(256);

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

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(10240);

                    b.Property<bool>("IsPublic");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(256);

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

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(10240);

                    b.Property<DateTime>("End");

                    b.Property<Guid?>("EventId");

                    b.Property<string>("LectureRoom")
                        .IsRequired()
                        .HasMaxLength(256);

                    b.Property<DateTime>("Start");

                    b.Property<string>("Teacher")
                        .IsRequired()
                        .HasMaxLength(256);

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(256);

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

                    b.Property<string>("Description")
                        .HasMaxLength(256);

                    b.Property<Guid?>("EventDayId");

                    b.Property<DateTime>("UpdatedAt");

                    b.Property<Guid>("UpdatedByUserId");

                    b.Property<string>("Value")
                        .IsRequired()
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("EventDayId");

                    b.ToTable("SchoolingEventDayTags");
                });

            modelBuilder.Entity("JetAnotherEMS.Domain.Models.SchoolingEventFollower", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedAt");

                    b.Property<Guid>("CreatedByUserId");

                    b.Property<Guid>("EventId");

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
                        .IsRequired()
                        .HasMaxLength(32);

                    b.Property<Guid>("EventId");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(256);

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

                    b.Property<string>("FileName")
                        .IsRequired()
                        .HasMaxLength(128);

                    b.Property<string>("FtpFileUrl")
                        .IsRequired()
                        .HasMaxLength(512);

                    b.Property<string>("LocationOnDisk")
                        .IsRequired()
                        .HasMaxLength(512);

                    b.Property<string>("OriginalName")
                        .IsRequired()
                        .HasMaxLength(128);

                    b.Property<long>("Size");

                    b.Property<DateTime>("UpdatedAt");

                    b.Property<Guid>("UpdatedByUserId");

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

                    b.Property<Guid?>("EventId");

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
                    b.HasOne("JetAnotherEMS.Domain.Models.SchoolingEventDay", "EventDay")
                        .WithMany("Tags")
                        .HasForeignKey("EventDayId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("JetAnotherEMS.Domain.Models.SchoolingEventFollower", b =>
                {
                    b.HasOne("JetAnotherEMS.Domain.Models.SchoolingEvent", "Event")
                        .WithMany("Followers")
                        .HasForeignKey("EventId")
                        .OnDelete(DeleteBehavior.Cascade);
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
                        .HasForeignKey("EventId");
                });
#pragma warning restore 612, 618
        }
    }
}
