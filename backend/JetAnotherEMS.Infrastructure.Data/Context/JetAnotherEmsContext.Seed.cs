using System;
using System.Collections.Generic;
using JetAnotherEMS.Domain.Models;
using Microsoft.EntityFrameworkCore.Internal;

namespace JetAnotherEMS.Infrastructure.Data.Context
{
    public static class JetAnotherEmsContextSeed
    {
        public static void Seed(this JetAnotherEmsContext context)
        {
            var events = new List<SchoolingEvent>()
            {
                new SchoolingEvent()
                {
                    Id = Guid.Parse("f9d6f596-b4af-40f0-8520-6f2e124c085d"),
                    Title = "Seed title",
                    Description = "Seed description",
                    IsPublic = true,
                    Location = new SchoolingEventAddress()
                    {
                        Id = Guid.Parse("d87bce2b-29f5-438e-910f-201eac76b27b"),
                        Description = "Zygmunta Janiszewskiego 7, Wrocław",
                        Lat = 51.109427201651876f,
                        Lng = 17.05958488218637f
                    },
                    Schedule = new List<SchoolingEventDay>()
                    {
                        new SchoolingEventDay()
                        {
                            Title = "Dummy title",
                            Description = "Dummy day description",
                            LectureRoom = "C3 123",
                            Teacher = "Andrew Gol",
                            Start = DateTime.Now,
                            End = DateTime.Now.AddHours(1),
                            Tags = new List<SchoolingEventDayTag>()
                            {
                                new SchoolingEventDayTag()
                                {
                                    Value = "Angular",
                                    Description = "Web framework"
                                }
                            }
                        },
                        new SchoolingEventDay()
                        {
                            Title = "Dummy title2",
                            Description = "Dummy day description2",
                            LectureRoom = "C3 1232",
                            Teacher = "Andrew Gol2",
                            Start = DateTime.Now.AddHours(2),
                            End = DateTime.Now.AddHours(3),
                            Tags = new List<SchoolingEventDayTag>()
                            {
                                new SchoolingEventDayTag()
                                {
                                    Value = "Angular2",
                                    Description = "Web framework2"
                                }
                            }
                        }
                    },
                    AvailableTickets = new List<SchoolingEventTicket>()
                    {
                        new SchoolingEventTicket()
                        {
                            Name = "FREE",
                            Price = 0,
                            TotalQuantity = 100,
                            Currency = "PLN"
                        },
                        new SchoolingEventTicket()
                        {
                            Name = "VIP",
                            Price = 95,
                            TotalQuantity = 20,
                            Currency = "PLN"
                        }
                    }
                    
                }
            };

            if (!context.Set<SchoolingEvent>().Any())
            {
                context.AddRange(events);
                context.SaveChanges();
            }
        }
    }
}
