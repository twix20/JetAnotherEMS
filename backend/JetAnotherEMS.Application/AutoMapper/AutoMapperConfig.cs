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
                    .ForMember(dest => dest.EndingDateTime, opts => opts.MapFrom(src => src.Schedule.OrderByDescending(d => d.End).Select(d => d.End).FirstOrDefault()))
                    .ForMember(dest => dest.TicketsLeftCount, opts => opts.MapFrom(src => src.AvailableTickets.Sum(t => t.TotalQuantity) - src.ParticipantsTickets.Count))
                    .ForMember(dest => dest.MinTicketPrice, opts => opts.MapFrom(src => src.AvailableTickets.Min(t => t.Price)))
                    .ForMember(
                        dest => dest.FeaturedTags,
                        opts => opts.MapFrom(determinateFeaturedTagsFromSchedule)); // Take 5 most reused tags in the schedule

                cfg.CreateMap<BuyEventTicketViewModel, BuyEventTicketCommand>(MemberList.Source);

                cfg.CreateMap<UserSchoolingEventTicket, SchoolingEventParticipantViewModel>()
                    .ForMember(dest => dest.UserSchoolingEventTicketId, opts => opts.MapFrom(src => src.Id))
                    .ForMember(dest => dest.UserEmail, opts => opts.Ignore());

                cfg.CreateMap<ApplicationUser, SchoolingEventParticipantViewModel>()
                    .ForMember(dest => dest.UserId, opts => opts.MapFrom(u => u.Id))
                    .ForMember(dest => dest.UserEmail, opts => opts.MapFrom(src => src.Email))
                    .ForMember(dest => dest.UserSchoolingEventTicketId, opts => opts.Ignore())
                    .ForMember(dest => dest.Status, opts => opts.Ignore())
                    .ForMember(dest => dest.TicketName, opts => opts.Ignore())
                    .ForMember(dest => dest.TicketPrice, opts => opts.Ignore())
                    .ForMember(dest => dest.TicketCurrency, opts => opts.Ignore())
                    .ForMember(dest => dest.TicketTotalQuantity, opts => opts.Ignore());



                cfg.CreateMap<IFormFile, UploadedFileViewModel>()
                    .ForMember(dest => dest.Size, opts => opts.MapFrom(src => src.Length))
                    .ForMember(dest => dest.OriginalName, opts => opts.MapFrom(src => src.FileName))
                    .ForAllOtherMembers(opts => opts.Ignore());


                cfg.CreateMap<UploadedFileViewModel, UploadedFile>(MemberList.Source);

                cfg.CreateMap<CreateSchoolingEventViewModel, CreateNewSchoolingEventCommand>(MemberList.Source);
                cfg.CreateMap<UpdateSchoolingEventViewModel, UpdateSchoolingEventCommand>(MemberList.Source);

                cfg.CreateMap<CreateNewSchoolingEventCommand, SchoolingEvent>(MemberList.Source)
                    //TODO: rename schedule -> calendar
                    // TODO: rename AvailableTickets -> Tickets
                    .ForMember(dest => dest.Schedule, opts => opts.MapFrom(src => src.Calendar))
                    .ForMember(dest => dest.AvailableTickets, opts => opts.MapFrom(src => src.Tickets));
                cfg.CreateMap<UpdateSchoolingEventCommand, SchoolingEvent>(MemberList.Source)
                    //TODO: rename schedule -> calendar
                    // TODO: rename AvailableTickets -> Tickets
                    .ForMember(dest => dest.Schedule, opts => opts.MapFrom(src => src.Calendar))
                    .ForMember(dest => dest.AvailableTickets, opts => opts.MapFrom(src => src.Tickets));

                cfg.CreateMap<ChangeTicketStatusViewModel, ChangeTicketStatusCommand>(MemberList.Source);
                cfg.CreateMap<ChangeTicketsStatusViewModel, ChangeTicketsStatusCommand>(MemberList.Source);

                cfg.CreateMap<SchoolingEventDayTagViewModel, SchoolingEventDayTag>(MemberList.Source);
                cfg.CreateMap<SchoolingEventTicketViewModel, SchoolingEventTicket>(MemberList.Source)
                    .ForSourceMember(src => src.UsersBoughtThisTicket, opts => opts.Ignore());
                cfg.CreateMap<SchoolingEventTicket, SchoolingEventTicketViewModel>()
                    .ForMember(dest => dest.UsersBoughtThisTicket, opts => opts.ResolveUsing((e, vm) =>
                    {
                        return e.Event.ParticipantsTickets
                            .Where(t => t.Status == TicketStatus.Approved || t.Status == TicketStatus.AwaitingApproval)
                            .Count(t => t.Ticket.Id ==  vm.Id);
                    }));

                cfg.CreateMap<SchoolingEventDayViewModel, SchoolingEventDay>(MemberList.Source);


                cfg.CreateMap<SchoolingEventDayAttachmentViewModel, SchoolingEventDayAttachment>(MemberList.Source);
                cfg.CreateMap<SchoolingEventGalleryFileViewModel, SchoolingEventGalleryFile>(MemberList.Source);

                cfg.CreateMap<SchoolingEventAddressViewModel, SchoolingEventAddress>(MemberList.Source);

                cfg.CreateMap<ChangeFollowSchoolingEventViewModel, ChangeFollowSchoolingEventCommand>(MemberList.Source);

                cfg.CreateMap<CancelEventTicketViewModel, CancelEventTicketCommand>(MemberList.Source);
            });



            //Mapper.AssertConfigurationIsValid();
            //TODO: make it pass
        }
    }
}
