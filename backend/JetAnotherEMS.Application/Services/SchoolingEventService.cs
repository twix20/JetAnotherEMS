using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using JetAnotherEMS.Application.Interfaces;
using JetAnotherEMS.Application.ViewModels;
using JetAnotherEMS.Domain.Commands.SchoolingEvent;
using JetAnotherEMS.Domain.Core.Bus;
using JetAnotherEMS.Domain.Interfaces;
using JetAnotherEMS.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace JetAnotherEMS.Application.Services
{
    public class SchoolingEventService : ISchoolingEventService
    {
        private readonly IMediatorHandler _bus;
        private readonly ISchoolingEventRepository _schoolingEventRepository;

        public SchoolingEventService(ISchoolingEventRepository schoolingEventRepository, IMediatorHandler bus)
        {
            this._schoolingEventRepository = schoolingEventRepository;
            _bus = bus;
        }

        public async Task<IEnumerable<SchoolingEventViewModel>> GetFeaturedEvents(int page, int pageSize)
        {
            //TODO: add pagination

            var featuredEvents = await _schoolingEventRepository
                .GetAll()
                .Skip(page * pageSize)
                .Take(pageSize)
                .ProjectTo<SchoolingEventViewModel>()
                .ToListAsync();

            return featuredEvents;
        }

        public async Task<SchoolingEventViewModel> GetById(Guid id)
        {
            var entity = await _schoolingEventRepository.GetById(id);

            return Mapper.Map<SchoolingEventViewModel>(entity);
        }

        public async Task Create(SchoolingEventViewModel viewModel)
        {
            var command = Mapper.Map<CreateNewSchoolingEventCommand>(viewModel);

            await _bus.SendCommand(command);
        }
    }
}
