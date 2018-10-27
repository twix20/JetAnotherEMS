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

        public async Task<IEnumerable<FeaturedSchoolingEventViewModel>> GetFeaturedEvents(SchoolingEventFilterViewModel filter, int page, int pageSize)
        {
            var featuredEventsQuery = _schoolingEventRepository
                .GetAll()
                .Skip(page * pageSize)
                .Take(pageSize);

            if (filter != null)
                featuredEventsQuery = ApplyFilters(featuredEventsQuery, filter);

            return await featuredEventsQuery.ProjectTo<FeaturedSchoolingEventViewModel>()
                .ToListAsync();
        }

        public async Task<FeaturedSchoolingEventViewModel> GetFeaturedById(Guid id)
        {
            var entity = await _schoolingEventRepository.GetById(id);

            return Mapper.Map<FeaturedSchoolingEventViewModel>(entity);
        }

        public async Task<IEnumerable<SchoolingEventDayViewModel>> GetSchedule(Guid id)
        {
            var entity = await _schoolingEventRepository.GetById(id);

            return entity.Schedule.Select(Mapper.Map<SchoolingEventDayViewModel>);
        }

        public async Task Create(CreateSchoolingEventViewModel viewModel)
        {
            var command = Mapper.Map<CreateNewSchoolingEventCommand>(viewModel);

            await _bus.SendCommand(command);
        }

        public async Task Update(UpdateSchoolingEventViewModel viewModel)
        {
            var command = Mapper.Map<UpdateSchoolingEventCommand>(viewModel);

            await _bus.SendCommand(command);
        }

        private IQueryable<SchoolingEvent> ApplyFilters(IQueryable<SchoolingEvent> query,
            SchoolingEventFilterViewModel filter)
        {
            // Date
            if (filter.DateFrom.HasValue)
            {
                query = query.Where(e => e.Schedule.Any() && e.Schedule.Min(d => d.From) <= filter.DateFrom.Value);
            }
            if (filter.DateTo.HasValue)
            {
                query = query.Where(e => e.Schedule.Any() && e.Schedule.Max(d => d.To) <= filter.DateTo.Value);
            }

            // Price
            if (filter.PriceFrom.HasValue)
            {
                query = query.Where(e => e.AvailableTickets.Any(t => t.Price >= filter.PriceFrom));
            }
            if (filter.PriceTo.HasValue)
            {
                query = query.Where(e => e.AvailableTickets.Any(t => t.Price <= filter.PriceTo));
            }

            // Only ongoing
            if (filter.OnlyOngoing.HasValue)
            {
                var now = DateTime.UtcNow;
                query = query.Where(e => e.Schedule.Any() && e.Schedule.Max(d => d.To) >= now && e.Schedule.Min(d => d.From) <= now);
            }

            //TODO: add only favorites
            return query;
        }
    }
}
