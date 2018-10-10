using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace JetAnotherEMS.Infrastructure.Data.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "GoogleMapsAddresses",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Street = table.Column<string>(nullable: true),
                    City = table.Column<string>(nullable: true),
                    State = table.Column<string>(nullable: true),
                    ZipCode = table.Column<string>(nullable: true),
                    Country = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GoogleMapsAddresses", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SchoolingEvents",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Title = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    LocationId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SchoolingEvents", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SchoolingEvents_GoogleMapsAddresses_LocationId",
                        column: x => x.LocationId,
                        principalTable: "GoogleMapsAddresses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "SchoolingEventDays",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    From = table.Column<DateTime>(nullable: false),
                    To = table.Column<DateTime>(nullable: false),
                    Title = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    Teacher = table.Column<string>(nullable: true),
                    LectureRoom = table.Column<string>(nullable: true),
                    EventId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SchoolingEventDays", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SchoolingEventDays_SchoolingEvents_EventId",
                        column: x => x.EventId,
                        principalTable: "SchoolingEvents",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "SchoolingEventTickets",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Price = table.Column<decimal>(nullable: false),
                    TotalQuantity = table.Column<long>(nullable: false),
                    Status = table.Column<int>(nullable: false),
                    EventId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SchoolingEventTickets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SchoolingEventTickets_SchoolingEvents_EventId",
                        column: x => x.EventId,
                        principalTable: "SchoolingEvents",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "SchoolingEventDayAttachments",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    SchoolingEventDayId = table.Column<Guid>(nullable: true),
                    SchoolingEventId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SchoolingEventDayAttachments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SchoolingEventDayAttachments_SchoolingEventDays_SchoolingEventDayId",
                        column: x => x.SchoolingEventDayId,
                        principalTable: "SchoolingEventDays",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_SchoolingEventDayAttachments_SchoolingEvents_SchoolingEventId",
                        column: x => x.SchoolingEventId,
                        principalTable: "SchoolingEvents",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "SchoolingEventDayTags",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    SchoolingEventDayId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SchoolingEventDayTags", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SchoolingEventDayTags_SchoolingEventDays_SchoolingEventDayId",
                        column: x => x.SchoolingEventDayId,
                        principalTable: "SchoolingEventDays",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UserSchoolingEventTickets",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    UserId = table.Column<Guid>(nullable: false),
                    TicketId = table.Column<Guid>(nullable: true),
                    SchoolingEventId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserSchoolingEventTickets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserSchoolingEventTickets_SchoolingEvents_SchoolingEventId",
                        column: x => x.SchoolingEventId,
                        principalTable: "SchoolingEvents",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UserSchoolingEventTickets_SchoolingEventTickets_TicketId",
                        column: x => x.TicketId,
                        principalTable: "SchoolingEventTickets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SchoolingEventDayAttachments_SchoolingEventDayId",
                table: "SchoolingEventDayAttachments",
                column: "SchoolingEventDayId");

            migrationBuilder.CreateIndex(
                name: "IX_SchoolingEventDayAttachments_SchoolingEventId",
                table: "SchoolingEventDayAttachments",
                column: "SchoolingEventId");

            migrationBuilder.CreateIndex(
                name: "IX_SchoolingEventDays_EventId",
                table: "SchoolingEventDays",
                column: "EventId");

            migrationBuilder.CreateIndex(
                name: "IX_SchoolingEventDayTags_SchoolingEventDayId",
                table: "SchoolingEventDayTags",
                column: "SchoolingEventDayId");

            migrationBuilder.CreateIndex(
                name: "IX_SchoolingEvents_LocationId",
                table: "SchoolingEvents",
                column: "LocationId");

            migrationBuilder.CreateIndex(
                name: "IX_SchoolingEventTickets_EventId",
                table: "SchoolingEventTickets",
                column: "EventId");

            migrationBuilder.CreateIndex(
                name: "IX_UserSchoolingEventTickets_SchoolingEventId",
                table: "UserSchoolingEventTickets",
                column: "SchoolingEventId");

            migrationBuilder.CreateIndex(
                name: "IX_UserSchoolingEventTickets_TicketId",
                table: "UserSchoolingEventTickets",
                column: "TicketId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SchoolingEventDayAttachments");

            migrationBuilder.DropTable(
                name: "SchoolingEventDayTags");

            migrationBuilder.DropTable(
                name: "UserSchoolingEventTickets");

            migrationBuilder.DropTable(
                name: "SchoolingEventDays");

            migrationBuilder.DropTable(
                name: "SchoolingEventTickets");

            migrationBuilder.DropTable(
                name: "SchoolingEvents");

            migrationBuilder.DropTable(
                name: "GoogleMapsAddresses");
        }
    }
}
