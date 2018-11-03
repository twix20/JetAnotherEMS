using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Linq.Expressions;
using AutoMapper;
using JetAnotherEMS.Application.ViewModels;
using JetAnotherEMS.Domain.Commands.SchoolingEvent;
using JetAnotherEMS.Domain.Models;
using JetAnotherEMS.Infrastructure.Identity.Models;
using Microsoft.AspNetCore.Http;

namespace JetAnotherEMS.Application.AutoMapper
{
    public static class AutoMapperConfig
    {
        public static void RegisterMappings()
        {
            Expression<Func<SchoolingEvent, IEnumerable<SchoolingEventDayTag>>> determinateFeaturedTagsFromSchedule =
                src => src.Schedule
                    .SelectMany(d => d.Tags)
                    .GroupBy(d => d.Value)
                    .OrderByDescending(g => g.Count())
                    .Select(g => g.FirstOrDefault())
                    .Take(5);


            Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<SchoolingEvent, FeaturedSchoolingEventViewModel>()

                    .ForMember(dest => dest.ScheduleDaysCount, opts => opts.MapFrom(src => src.Schedule.GroupBy(d => d.Start.Day).Count()))
                    .ForMember(dest => dest.TeacherNames, opts => opts.MapFrom(src => src.Schedule.Select(d => d.Teacher).Distinct()))
                    .ForMember(dest => dest.StartingDateTime, opts => opts.MapFrom(src => src.Schedule.OrderBy(d => d.Start).Select(d => d.Start).FirstOrDefault()))
                    .ForMember(dest => dest.TicketsLeftCount, opts => opts.MapFrom(src => src.AvailableTickets.Sum(t => t.TotalQuantity) - src.ParticipantsTickets.Count))
                    .ForMember(dest => dest.MinTicketPrice, opts => opts.MapFrom(src => src.AvailableTickets.Min(t => t.Price)))
                    .ForMember(
                        dest => dest.FeaturedTags,
                        opts => opts.MapFrom(determinateFeaturedTagsFromSchedule)); // Take 5 most reused tags in the schedule

                cfg.CreateMap<BuyEventTicketViewModel, BuyEventTicketCommand>();
                cfg.CreateMap<CancelEventTicketViewModel, CancelEventTicketCommand>();

                cfg.CreateMap<UserSchoolingEventTicket, SchoolingEventParticipantViewModel>()
                    .ForMember(dest => dest.UserSchoolingEventTicketId, opts => opts.MapFrom(src => src.Id));

                cfg.CreateMap<ApplicationUser, SchoolingEventParticipantViewModel>()
                    .ForMember(dest => dest.UserEmail, opts => opts.MapFrom(src => src.Email));


                cfg.CreateMap<IFormFile, UploadedFileViewModel>()
                    .ForMember(dest => dest.Type, opts => opts.ResolveUsing(f => MapExtension(f.FileName)))
                    .ForMember(dest => dest.OriginalName, opts => opts.MapFrom(src => src.FileName));
 

                cfg.CreateMap<UploadedFileViewModel, UploadedFile>()
                    .ForMember(dest => dest.Id, opts => opts.MapFrom(src => src.Id))
                    .ForMember(dest => dest.FileName, opts => opts.MapFrom(src => src.FileName))
                    .ForMember(dest => dest.Type, opts => opts.MapFrom(src => src.Type))
                    .ForMember(dest => dest.LocationOnDisk, opts => opts.MapFrom(src => src.LocationOnDisk))
                    .ForMember(dest => dest.OriginalName, opts => opts.MapFrom(src => src.OriginalName))
                    .ForMember(dest => dest.Size, opts => opts.MapFrom(src => src.Size))
                    .ForAllOtherMembers(opts => opts.Ignore());


                cfg.CreateMap<CreateSchoolingEventViewModel, CreateNewSchoolingEventCommand>();
                cfg.CreateMap<CreateNewSchoolingEventCommand, SchoolingEvent>()
                    //TODO: rename schedule -> calendar
                    // TODO: rename AvailableTickets -> Tickets
                    .ForMember(dest => dest.Schedule, opts => opts.MapFrom(src => src.Calendar))
                    .ForMember(dest => dest.AvailableTickets, opts => opts.MapFrom(src => src.Tickets));

                cfg.CreateMap<ApproveEventTicketsViewModel, ApproveEventTicketCommand>(MemberList.Source);

                cfg.CreateMap<SchoolingEventDayAttachmentViewModel, SchoolingEventDayAttachment>();
                cfg.CreateMap<SchoolingEventTicketViewModel, SchoolingEventTicket>(MemberList.Source);
                cfg.CreateMap<SchoolingEventTicket, SchoolingEventTicketViewModel>()
                    .ForMember(dest => dest.UsersBoughtThisTicket, opts => opts.ResolveUsing((e, vm) =>
                    {
                        return e.Event.ParticipantsTickets
                            .Where(t => t.Status == TicketStatus.Approved || t.Status == TicketStatus.AwaitingApproval)
                            .Count(t => t.Ticket.Id ==  vm.Id);
                    }));

                cfg.CreateMap<SchoolingEventDayViewModel, SchoolingEventDay>(MemberList.Source);

                cfg.CreateMap<UploadedFileViewModel, UploadedFile>()
                    .ForMember(
                        dest => dest.FileType,
                        opts => opts.ResolveUsing(
                            src => UploadedFile.MimeTypesByFileType.ContainsValue(src.Type)
                                ? UploadedFile.MimeTypesByFileType.First(x => x.Value == src.Type).Key
                                : UploadedFileType.Unknown));


                cfg.CreateMap<SchoolingEventDayAttachmentViewModel, SchoolingEventDayAttachment>()
                    .ForMember(
                        dest => dest.FileType,
                        opts => opts.ResolveUsing(
                            src => UploadedFile.MimeTypesByFileType.ContainsValue(src.Type)
                                ? UploadedFile.MimeTypesByFileType.First(x => x.Value == src.Type).Key
                                : UploadedFileType.Unknown));
            });




        }

        public static UploadedFileType MapExtension(string fileName)
        {
            var extension = Path.GetExtension(fileName)?.ToLower();

            switch (extension)
            {
                case ".jpg":
                    return UploadedFileType.Jpg;
                case ".png":
                    return UploadedFileType.Png;
                case ".pdf":
                    return UploadedFileType.Pdf;
                case ".zip":
                    return UploadedFileType.Zip;
                default:
                    return UploadedFileType.Unknown;
            }
        }
    }
}
