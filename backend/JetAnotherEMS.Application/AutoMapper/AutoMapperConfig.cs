using AutoMapper;
using JetAnotherEMS.Application.ViewModels;
using JetAnotherEMS.Domain.Models;

namespace JetAnotherEMS.Application.AutoMapper
{
    public class AutoMapperConfig
    {
        public static MapperConfiguration RegisterMappings()
        {
            return new MapperConfiguration(cfg =>
            {
                //TODO: register mappings
                //cfg.AddProfile(new DomainToViewModelMappingProfile());
                //cfg.AddProfile(new ViewModelToDomainMappingProfile());

                cfg.CreateMap<SchoolingEvent, SchoolingEventViewModel>();
            });
        }
    }
}
