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

                    b.Property<string>("City");

                    b.Property<string>("Country");

                    b.Property<string>("State");

                    b.Property<string>("Street");

                    b.Property<string>("ZipCode");

                    b.HasKey("Id");

                    b.ToTable("GoogleMapsAddresses");
                });

            modelBuilder.Entity("JetAnotherEMS.Domain.Models.SchoolingEvent", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.Property<Guid?>("LocationId");

                    b.Property<string>("Title");

                    b.HasKey("Id");

                    b.HasIndex("LocationId");

                    b.ToTable("SchoolingEvents");

                    b.HasData(
                        new { Id = new Guid("f9d6f596-b4af-40f0-8520-6f2e124c085d"), Description = "Seed description", Title = "Seed title" }
                    );
                });

            modelBuilder.Entity("JetAnotherEMS.Domain.Models.SchoolingEventDay", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.Property<Guid?>("EventId");

                    b.Property<DateTime>("From");

                    b.Property<string>("LectureRoom");

                    b.Property<string>("Teacher");

                    b.Property<string>("Title");

                    b.Property<DateTime>("To");

                    b.HasKey("Id");

                    b.HasIndex("EventId");

                    b.ToTable("SchoolingEventDays");
                });

            modelBuilder.Entity("JetAnotherEMS.Domain.Models.SchoolingEventDayAttachment", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<byte[]>("Content");

                    b.Property<string>("Extension");

                    b.Property<string>("NameOriginal");

                    b.Property<string>("NameToStore");

                    b.Property<Guid?>("SchoolingEventDayId");

                    b.Property<Guid?>("SchoolingEventId");

                    b.HasKey("Id");

                    b.HasIndex("SchoolingEventDayId");

                    b.HasIndex("SchoolingEventId");

                    b.ToTable("SchoolingEventDayAttachments");
                });

            modelBuilder.Entity("JetAnotherEMS.Domain.Models.SchoolingEventDayTag", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.Property<Guid?>("SchoolingEventDayId");

                    b.Property<string>("Value");

                    b.HasKey("Id");

                    b.HasIndex("SchoolingEventDayId");

                    b.ToTable("SchoolingEventDayTags");
                });

            modelBuilder.Entity("JetAnotherEMS.Domain.Models.SchoolingEventFollower", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid?>("EventId");

                    b.Property<Guid>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("EventId");

                    b.ToTable("SchoolingEventFollowers");
                });

            modelBuilder.Entity("JetAnotherEMS.Domain.Models.SchoolingEventTicket", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid?>("EventId");

                    b.Property<string>("Name");

                    b.Property<decimal>("Price");

                    b.Property<int>("Status");

                    b.Property<long>("TotalQuantity");

                    b.HasKey("Id");

                    b.HasIndex("EventId");

                    b.ToTable("SchoolingEventTickets");
                });

            modelBuilder.Entity("JetAnotherEMS.Domain.Models.UserSchoolingEventTicket", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid?>("SchoolingEventId");

                    b.Property<Guid?>("TicketId");

                    b.Property<Guid>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("SchoolingEventId");

                    b.HasIndex("TicketId");

                    b.ToTable("UserSchoolingEventTickets");
                });

            modelBuilder.Entity("JetAnotherEMS.Domain.Models.SchoolingEvent", b =>
                {
                    b.HasOne("JetAnotherEMS.Domain.Models.GoogleMapsAddress", "Location")
                        .WithMany()
                        .HasForeignKey("LocationId");
                });

            modelBuilder.Entity("JetAnotherEMS.Domain.Models.SchoolingEventDay", b =>
                {
                    b.HasOne("JetAnotherEMS.Domain.Models.SchoolingEvent", "Event")
                        .WithMany("Schedule")
                        .HasForeignKey("EventId");
                });

            modelBuilder.Entity("JetAnotherEMS.Domain.Models.SchoolingEventDayAttachment", b =>
                {
                    b.HasOne("JetAnotherEMS.Domain.Models.SchoolingEventDay")
                        .WithMany("Attachments")
                        .HasForeignKey("SchoolingEventDayId");

                    b.HasOne("JetAnotherEMS.Domain.Models.SchoolingEvent")
                        .WithMany("Gallery")
                        .HasForeignKey("SchoolingEventId");
                });

            modelBuilder.Entity("JetAnotherEMS.Domain.Models.SchoolingEventDayTag", b =>
                {
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
                        .HasForeignKey("EventId");
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
#pragma warning restore 612, 618
        }
    }
}
