using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using JetAnotherEMS.Application.Interfaces;
using JetAnotherEMS.Application.ViewModels;
using JetAnotherEMS.Domain.Commands.SchoolingEvent;
using JetAnotherEMS.Domain.Core.Bus;
using JetAnotherEMS.Domain.Interfaces;
using JetAnotherEMS.Domain.Models;

namespace JetAnotherEMS.Application.Services
{
    public class SchoolingEventService : ISchoolingEventService
    {
        private readonly IMediatorHandler _bus;
        private readonly ISchoolingEventRepository _schoolingEventRepository;
        private readonly IMapper _mapper;

        public SchoolingEventService(ISchoolingEventRepository schoolingEventRepository, IMapper mapper, IMediatorHandler bus)
        {
            this._schoolingEventRepository = schoolingEventRepository;
            _mapper = mapper;
            _bus = bus;
        }

        public Task<IEnumerable<SchoolingEventViewModel>> GetAll()
        {
            var entities = _schoolingEventRepository.GetAll().ToList();

            var entitiesVms = entities.Select(e => _mapper.Map<SchoolingEventViewModel>(e));

            return Task.FromResult(entitiesVms);
        }

        public async Task<SchoolingEventViewModel> GetById(Guid id)
        {
            var entity = await _schoolingEventRepository.GetById(id);

            return _mapper.Map<SchoolingEventViewModel>(entity);
        }

        public async Task Create(SchoolingEventViewModel viewModel)
        {
            var command = _mapper.Map<CreateNewSchoolingEventCommand>(viewModel);

            await _bus.SendCommand(command);
        }
    }
}
