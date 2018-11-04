using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using JetAnotherEMS.Application.Interfaces;
using JetAnotherEMS.Application.ViewModels;
using JetAnotherEMS.Domain.Interfaces;

namespace JetAnotherEMS.Application.Services
{
    public class SchoolingEventDayTagService : ISchoolingEventDayTagService
    {

        private readonly ISchoolingEventDayTagRepository _schoolingEventDayTagRepository;

        public SchoolingEventDayTagService(ISchoolingEventDayTagRepository schoolingEventDayTagRepository)
        {
            _schoolingEventDayTagRepository = schoolingEventDayTagRepository;
        }

        public async Task<IEnumerable<SchoolingEventDayTagViewModel>> Search(string query)
        {
            var entities = await _schoolingEventDayTagRepository.Search(query);

            return entities.Select(Mapper.Map<SchoolingEventDayTagViewModel>);
        }
    }
}
