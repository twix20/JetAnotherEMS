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
                cfg.CreateMap<SchoolingEvent, SchoolingEventViewModel>()

                    .ForMember(dest => dest.ScheduleDaysCount, opts => opts.MapFrom(src => src.Schedule.Count))
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
