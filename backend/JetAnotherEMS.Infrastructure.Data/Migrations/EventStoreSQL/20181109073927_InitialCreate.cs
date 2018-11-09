using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace JetAnotherEMS.Infrastructure.Data.Migrations.EventStoreSQL
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SchoolingEvent",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    CreatedByUserId = table.Column<Guid>(nullable: false),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedByUserId = table.Column<Guid>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: false),
                    Title = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    IsPublic = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SchoolingEvent", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "StoredEvent",
                columns: table => new
                {
                    MessageType = table.Column<string>(nullable: true),
                    AggregateId = table.Column<Guid>(nullable: false),
                    Timestamp = table.Column<DateTime>(nullable: false),
                    Id = table.Column<Guid>(nullable: false),
                    Data = table.Column<string>(nullable: true),
                    User = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StoredEvent", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SchoolingEventAddress",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    CreatedByUserId = table.Column<Guid>(nullable: false),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedByUserId = table.Column<Guid>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    Lat = table.Column<float>(nullable: false),
                    Lng = table.Column<float>(nullable: false),
                    EventId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SchoolingEventAddress", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SchoolingEventAddress_SchoolingEvent_EventId",
                        column: x => x.EventId,
                        principalTable: "SchoolingEvent",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SchoolingEventDay",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    CreatedByUserId = table.Column<Guid>(nullable: false),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedByUserId = table.Column<Guid>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: false),
                    Start = table.Column<DateTime>(nullable: false),
                    End = table.Column<DateTime>(nullable: false),
                    Title = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    Teacher = table.Column<string>(nullable: true),
                    LectureRoom = table.Column<string>(nullable: true),
                    EventId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SchoolingEventDay", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SchoolingEventDay_SchoolingEvent_EventId",
                        column: x => x.EventId,
                        principalTable: "SchoolingEvent",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "SchoolingEventFollower",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    CreatedByUserId = table.Column<Guid>(nullable: false),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedByUserId = table.Column<Guid>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: false),
                    UserId = table.Column<Guid>(nullable: false),
                    EventId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SchoolingEventFollower", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SchoolingEventFollower_SchoolingEvent_EventId",
                        column: x => x.EventId,
                        principalTable: "SchoolingEvent",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "SchoolingEventTicket",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    CreatedByUserId = table.Column<Guid>(nullable: false),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedByUserId = table.Column<Guid>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    Price = table.Column<decimal>(nullable: false),
                    TotalQuantity = table.Column<long>(nullable: false),
                    Currency = table.Column<string>(nullable: false),
                    EventId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SchoolingEventTicket", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SchoolingEventTicket_SchoolingEvent_EventId",
                        column: x => x.EventId,
                        principalTable: "SchoolingEvent",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SchoolingEventDayTag",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    CreatedByUserId = table.Column<Guid>(nullable: false),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedByUserId = table.Column<Guid>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: false),
                    Value = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    EventId = table.Column<Guid>(nullable: true),
                    SchoolingEventDayId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SchoolingEventDayTag", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SchoolingEventDayTag_SchoolingEvent_EventId",
                        column: x => x.EventId,
                        principalTable: "SchoolingEvent",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_SchoolingEventDayTag_SchoolingEventDay_SchoolingEventDayId",
                        column: x => x.SchoolingEventDayId,
                        principalTable: "SchoolingEventDay",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UploadedFile",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    CreatedByUserId = table.Column<Guid>(nullable: false),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedByUserId = table.Column<Guid>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: false),
                    FileName = table.Column<string>(nullable: true),
                    OriginalName = table.Column<string>(nullable: true),
                    LocationOnDisk = table.Column<string>(nullable: true),
                    Size = table.Column<long>(nullable: false),
                    Discriminator = table.Column<string>(nullable: false),
                    SchoolingEventDayId = table.Column<Guid>(nullable: true),
                    EventId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UploadedFile", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UploadedFile_SchoolingEventDay_SchoolingEventDayId",
                        column: x => x.SchoolingEventDayId,
                        principalTable: "SchoolingEventDay",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UploadedFile_SchoolingEvent_EventId",
                        column: x => x.EventId,
                        principalTable: "SchoolingEvent",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserSchoolingEventTicket",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    CreatedByUserId = table.Column<Guid>(nullable: false),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedByUserId = table.Column<Guid>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: false),
                    UserId = table.Column<Guid>(nullable: false),
                    Status = table.Column<int>(nullable: false),
                    TicketId = table.Column<Guid>(nullable: true),
                    SchoolingEventId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserSchoolingEventTicket", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserSchoolingEventTicket_SchoolingEvent_SchoolingEventId",
                        column: x => x.SchoolingEventId,
                        principalTable: "SchoolingEvent",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UserSchoolingEventTicket_SchoolingEventTicket_TicketId",
                        column: x => x.TicketId,
                        principalTable: "SchoolingEventTicket",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SchoolingEventAddress_EventId",
                table: "SchoolingEventAddress",
                column: "EventId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_SchoolingEventDay_EventId",
                table: "SchoolingEventDay",
                column: "EventId");

            migrationBuilder.CreateIndex(
                name: "IX_SchoolingEventDayTag_EventId",
                table: "SchoolingEventDayTag",
                column: "EventId");

            migrationBuilder.CreateIndex(
                name: "IX_SchoolingEventDayTag_SchoolingEventDayId",
                table: "SchoolingEventDayTag",
                column: "SchoolingEventDayId");

            migrationBuilder.CreateIndex(
                name: "IX_SchoolingEventFollower_EventId",
                table: "SchoolingEventFollower",
                column: "EventId");

            migrationBuilder.CreateIndex(
                name: "IX_SchoolingEventTicket_EventId",
                table: "SchoolingEventTicket",
                column: "EventId");

            migrationBuilder.CreateIndex(
                name: "IX_UploadedFile_SchoolingEventDayId",
                table: "UploadedFile",
                column: "SchoolingEventDayId");

            migrationBuilder.CreateIndex(
                name: "IX_UploadedFile_EventId",
                table: "UploadedFile",
                column: "EventId");

            migrationBuilder.CreateIndex(
                name: "IX_UserSchoolingEventTicket_SchoolingEventId",
                table: "UserSchoolingEventTicket",
                column: "SchoolingEventId");

            migrationBuilder.CreateIndex(
                name: "IX_UserSchoolingEventTicket_TicketId",
                table: "UserSchoolingEventTicket",
                column: "TicketId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SchoolingEventAddress");

            migrationBuilder.DropTable(
                name: "SchoolingEventDayTag");

            migrationBuilder.DropTable(
                name: "SchoolingEventFollower");

            migrationBuilder.DropTable(
                name: "StoredEvent");

            migrationBuilder.DropTable(
                name: "UploadedFile");

            migrationBuilder.DropTable(
                name: "UserSchoolingEventTicket");

            migrationBuilder.DropTable(
                name: "SchoolingEventDay");

            migrationBuilder.DropTable(
                name: "SchoolingEventTicket");

            migrationBuilder.DropTable(
                name: "SchoolingEvent");
        }
    }
}
