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
using JetAnotherEMS.Domain.Core.Notifications;
using JetAnotherEMS.Domain.Interfaces;
using JetAnotherEMS.Domain.Models;
using JetAnotherEMS.Infrastructure.Identity.Data;
using JetAnotherEMS.Infrastructure.Identity.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace JetAnotherEMS.Application.Services
{

    //TODO: add DomainNotifications when something goes wrong
    public class SchoolingEventService : ISchoolingEventService
    {
        private readonly IMediatorHandler _bus;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ISchoolingEventRepository _schoolingEventRepository;

        public SchoolingEventService(
            ISchoolingEventRepository schoolingEventRepository, 
            IMediatorHandler bus,
            UserManager<ApplicationUser> userManager)
        {
            this._schoolingEventRepository = schoolingEventRepository;
            _bus = bus;
            _userManager = userManager;
        }

        public async Task<FeaturedSchoolingEventViewModel> GetById(Guid id)
        {
            var entity = await _schoolingEventRepository.GetById(id);
            if (entity == null)
            {
                await _bus.RaiseEvent(new DomainNotification("GetById", $"Event with id {id} doesn't exist"));
                return null;
            }

            return Mapper.Map<FeaturedSchoolingEventViewModel>(entity);
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

        public async Task<IEnumerable<SchoolingEventTicketViewModel>> GetTickets(Guid id)
        {
            var entity = await _schoolingEventRepository.GetById(id);
            if (entity == null)
            {
                await _bus.RaiseEvent(new DomainNotification("GetTickets", $"Event with id {id} doesn't exist"));
                return null;
            }

            return entity.AvailableTickets.Select(Mapper.Map<SchoolingEventTicketViewModel>);
        }

        public async Task<IEnumerable<SchoolingEventDayViewModel>> GetSchedule(Guid id)
        {
            var entity = await _schoolingEventRepository.GetById(id);
            if (entity == null)
            {
                await _bus.RaiseEvent(new DomainNotification("GetSchedule", $"Event with id {id} doesn't exist"));
                return null;
            }

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

        public async Task<IEnumerable<SchoolingEventParticipantViewModel>> GetParticipants(Guid id)
        {
            var entity = await _schoolingEventRepository.GetById(id);
            if (entity == null)
            {
                await _bus.RaiseEvent(new DomainNotification("GetParticipants", $"Event with id {id} doesn't exist"));
                return null;
            }

            //TODO: refactor?
            var participantViewModels = entity.ParticipantsTickets.Select(p =>
            {
                var vm = Mapper.Map<SchoolingEventParticipantViewModel>(p);

                var user = _userManager.Users.First(u => u.Id == vm.UserId.ToString());

                Mapper.Map(user, vm);

                return vm;
            });

            return participantViewModels;
        }

        private IQueryable<SchoolingEvent> ApplyFilters(IQueryable<SchoolingEvent> query,
            SchoolingEventFilterViewModel filter)
        {
            // Date
            if (filter.DateFrom.HasValue)
            {
                query = query.Where(e => e.Schedule.Any() && e.Schedule.Min(d => d.Start) <= filter.DateFrom.Value);
            }
            if (filter.DateTo.HasValue)
            {
                query = query.Where(e => e.Schedule.Any() && e.Schedule.Max(d => d.End) <= filter.DateTo.Value);
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
                query = query.Where(e => e.Schedule.Any() && e.Schedule.Max(d => d.End) >= now && e.Schedule.Min(d => d.Start) <= now);
            }

            //TODO: add only favorites
            return query;
        }
    }
}
