using System.Linq;
using AutoMapper;
using JetAnotherEMS.Application.ViewModels;
using JetAnotherEMS.Domain.Models;

namespace JetAnotherEMS.Application.AutoMapper
{
    public class AutoMapperConfig
    {
        public static void RegisterMappings()
        {
            Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<SchoolingEvent, FeaturedSchoolingEventViewModel>()

                    .ForMember(dest => dest.ScheduleDaysCount, opts => opts.MapFrom(src => src.Schedule.Count))
                    .ForMember(dest => dest.TeacherNames, opts => opts.MapFrom(src => src.Schedule.Select(d => d.Teacher).Distinct()))
                    .ForMember(dest => dest.StartingDateTime, opts => opts.MapFrom(src => src.Schedule.OrderBy(d => d.From).Select(d => d.From).FirstOrDefault()))
                    .ForMember(
                        dest => dest.FeaturedTags,
                        opts => opts.MapFrom(src => src.Schedule
                            .SelectMany(d => d.Tags)
                            .GroupBy(d => d.Value)
                            .OrderByDescending(g => g.Count())
                            .Select(g => g.FirstOrDefault())
                            .Take(5))); // Take 5 most reused tags in the schedule
            });
        }
    }
}
