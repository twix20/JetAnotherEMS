using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using JetAnotherEMS.Domain.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore.Internal;

namespace JetAnotherEMS.Infrastructure.Data.Context
{
    public static class JetAnotherEmsContextSeed
    {
        public static void Seed(this JetAnotherEmsContext context, IHostingEnvironment hostingEnvironment, string baseUrl)
        {
            var uploadFolderPath = Path.Combine(hostingEnvironment.WebRootPath, "uploads");
            Directory.CreateDirectory(uploadFolderPath);

            Func<string, string> ftpFileUrlResolver = fileName => $"{baseUrl}/uploads/{fileName}";

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
                            },
                            Attachments = new List<SchoolingEventDayAttachment>()
                            {
                                new SchoolingEventDayAttachment()
                                {
                                    Id = Guid.Parse("9e2c7877-2fde-46f4-8efb-c7d3f85be0b1"),
                                    FileName = "JetAnotherEMS.Infrastructure.Data.Context.SeedData.Attachment_1.pdf",
                                    LocationOnDisk = uploadFolderPath,
                                    OriginalName = "Attachment_1.pdf",
                                    Size = 264_000,
                                    FtpFileUrl = $"{baseUrl}"
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
                            },
                            Attachments = new List<SchoolingEventDayAttachment>()
                            {
                                new SchoolingEventDayAttachment()
                                {
                                    Id = Guid.Parse("88edc8d2-e8f8-4f71-b717-5d23bf78a231"),
                                    FileName = "JetAnotherEMS.Infrastructure.Data.Context.SeedData.Attachment_2.pdf",
                                    LocationOnDisk = uploadFolderPath,
                                    OriginalName = "Attachment_2.pdf",
                                    Size = 264_000
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
                    },
                    Gallery = new List<SchoolingEventGalleryFile>()
                    {
                        new SchoolingEventGalleryFile()
                        {
                            Id = Guid.Parse("34265bbc-8279-4e00-9fbe-880ef8142751"),
                            FileName = "JetAnotherEMS.Infrastructure.Data.Context.SeedData.Gallery_1.jpg",
                            LocationOnDisk = uploadFolderPath,
                            OriginalName = "Gallery_1.jpg",
                            Size = 264_000,
                        },
                        new SchoolingEventGalleryFile()
                        {
                            Id = Guid.Parse("34265bbc-8279-4e00-9fbe-880ef8142752"),
                            FileName = "JetAnotherEMS.Infrastructure.Data.Context.SeedData.Gallery_2.jpg",
                            LocationOnDisk = uploadFolderPath,
                            OriginalName = "Gallery_2.jpg",
                            Size = 94_000,
                        },
                        new SchoolingEventGalleryFile()
                        {
                            Id = Guid.Parse("34265bbc-8279-4e00-9fbe-880ef8142753"),
                            FileName = "JetAnotherEMS.Infrastructure.Data.Context.SeedData.Gallery_3.png",
                            LocationOnDisk = uploadFolderPath,
                            OriginalName = "Gallery_3.png",
                            Size = 1_000_002,
                        },

                    }
                }
            };
            foreach (var @event in events)
            {
                foreach (var eventDay in @event.Schedule)
                {
                    foreach (var attachment in eventDay.Attachments)
                    {
                        attachment.FtpFileUrl = ftpFileUrlResolver(attachment.FileName);
                    }
                }
                foreach (var galleryFile in @event.Gallery)
                {
                    galleryFile.FtpFileUrl = ftpFileUrlResolver(galleryFile.FileName);
                }
            }




            if (!context.Set<SchoolingEvent>().Any())
            {
                var executinAssembly = Assembly.GetExecutingAssembly();
                var manifestResourceNames = Assembly.GetAssembly(typeof(JetAnotherEmsContextSeed)).GetManifestResourceNames();

                foreach (var resourceName in manifestResourceNames)
                {
                    using (Stream stream = executinAssembly.GetManifestResourceStream(resourceName))
                    {
                        var pathToSave = Path.Combine(uploadFolderPath, resourceName);

                        Console.WriteLine("pathToSave");
                        Console.WriteLine(pathToSave);

                        Console.WriteLine("stream.Length");
                        Console.WriteLine(stream.Length);

                        if (File.Exists(pathToSave))
                        {
                            Console.WriteLine("File existed, deleting");
                            File.Delete(pathToSave);
                        }

                        Console.WriteLine("before fileStream");
                        using (var fileStream = File.Create(pathToSave))
                        {
                            Console.WriteLine("fileStream");
                            stream.Seek(0, SeekOrigin.Begin);
                            stream.CopyTo(fileStream);
                        }
                    }
                }

                context.AddRange(events);
                context.SaveChanges();
            }
        }
    }
}
