using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using AutoMapper;
using JetAnotherEMS.Application.ViewModels;
using JetAnotherEMS.Domain.Commands.SchoolingEvent;
using JetAnotherEMS.Domain.Models;
using JetAnotherEMS.Infrastructure.Identity.Models;

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

                    .ForMember(dest => dest.ScheduleDaysCount, opts => opts.MapFrom(src => src.Schedule.GroupBy(d => d.From.Day).Count()))
                    .ForMember(dest => dest.TeacherNames, opts => opts.MapFrom(src => src.Schedule.Select(d => d.Teacher).Distinct()))
                    .ForMember(dest => dest.StartingDateTime, opts => opts.MapFrom(src => src.Schedule.OrderBy(d => d.From).Select(d => d.From).FirstOrDefault()))
                    .ForMember(dest => dest.TicketsLeftCount, opts => opts.MapFrom(src => src.AvailableTickets.Sum(t => t.TotalQuantity) - src.ParticipantsTickets.Count))
                    .ForMember(dest => dest.MinTicketPrice, opts => opts.MapFrom(src => src.AvailableTickets.Min(t => t.Price)))
                    .ForMember(
                        dest => dest.FeaturedTags,
                        opts => opts.MapFrom(determinateFeaturedTagsFromSchedule)); // Take 5 most reused tags in the schedule

                cfg.CreateMap<BuyEventTicketViewModel, BuyEventTicketCommand>();

                cfg.CreateMap<UserSchoolingEventTicket, SchoolingEventParticipantViewModel>();

                cfg.CreateMap<ApplicationUser, SchoolingEventParticipantViewModel>()
                    .ForMember(dest => dest.UserEmail, opts => opts.MapFrom(src => src.Email));
            });
        }
    }
}
