using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Ical.Net;
using Ical.Net.CalendarComponents;
using Ical.Net.DataTypes;
using ICSharpCode.SharpZipLib.Core;
using ICSharpCode.SharpZipLib.Zip;
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
        private readonly IUser _user;
        private readonly IMediatorHandler _bus;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ISchoolingEventRepository _schoolingEventRepository;

        public SchoolingEventService(
            IUser user,
            ISchoolingEventRepository schoolingEventRepository, 
            IMediatorHandler bus,
            UserManager<ApplicationUser> userManager)
        {
            _user = user;
            _schoolingEventRepository = schoolingEventRepository;
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

            var vm = Mapper.Map<FeaturedSchoolingEventViewModel>(entity);

            if (_user.IsAuthenticated())
            {
                var currentUserId = _user.Id;
                vm.IsFollowing = await _schoolingEventRepository.IsUserFollowingEvent(currentUserId, entity.Id);
                vm.HasCreated = vm.CreatedByUserId == _user.Id;
            }

            return vm;
        }

        public async Task<IEnumerable<FeaturedSchoolingEventViewModel>> GetFeaturedEvents(SchoolingEventFilterViewModel filter, SchoolingEventSortType sort, int page, int pageSize)
        {
            var featuredEventsQuery = _schoolingEventRepository
                .GetAll()
                .Where(e => e.IsPublic);

            if (filter != null)
                featuredEventsQuery = ApplyFilters(featuredEventsQuery, filter);

            if (sort != SchoolingEventSortType.None)
                featuredEventsQuery = ApplySort(featuredEventsQuery, sort);

            featuredEventsQuery = featuredEventsQuery
                .Skip(page * pageSize)
                .Take(pageSize);

            var vm = await featuredEventsQuery.ProjectTo<FeaturedSchoolingEventViewModel>().ToListAsync();

            if (_user.IsAuthenticated())
            {
                var currentUserId = _user.Id;
                foreach (var eventViewModel in vm)
                {
                    eventViewModel.IsFollowing = await _schoolingEventRepository.IsUserFollowingEvent(currentUserId, eventViewModel.Id);
                    eventViewModel.HasCreated = eventViewModel.CreatedByUserId == _user.Id;
                }
            }

            return vm;
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

        public async Task ChangeSchoolingEventFollow(ChangeFollowSchoolingEventViewModel viewModel)
        {
            viewModel.UserId = _user.Id;

            var command = Mapper.Map<ChangeFollowSchoolingEventCommand>(viewModel);

            await _bus.SendCommand(command);
        }

        public async Task<MemoryStream> CompressAllAttachmentsToZipForEvent(Guid eventId)
        {
            var entity = await _schoolingEventRepository.GetById(eventId);
            if (entity == null)
            {
                await _bus.RaiseEvent(new DomainNotification("CompressAllAttachmentsToZipForEvent", $"Event with id {eventId} doesn't exist"));
                return null;
            }

            var outputMemStream = new MemoryStream();
            var zipStream = new ZipOutputStream(outputMemStream);
            zipStream.SetLevel(4); //0-9, 9 being the highest level of compression

            var daysToZip = entity.Schedule.OrderBy(d => d.Start);
            foreach (var day in daysToZip)
            {
                foreach (var dayAttachment in day.Attachments)
                {
                    var entryName = $"{day.Start:ddMMyy}_{day.Title}_{dayAttachment.OriginalName}";
                    var newEntry = new ZipEntry(entryName) { DateTime = DateTime.Now };

                    zipStream.PutNextEntry(newEntry);

                    using (var attachmentStream = File.OpenRead(dayAttachment.FullFilePath))
                    {
                        StreamUtils.Copy(attachmentStream, zipStream, new byte[4096]);
                    }
                }
            }

            zipStream.CloseEntry();
            zipStream.IsStreamOwner = false;    // False stops the Close also Closing the underlying stream.
            zipStream.Close();          // Must finish the ZipOutputStream before using outputMemStream.

            outputMemStream.Position = 0;
            return outputMemStream;
        }

        public async Task<Calendar> GenerateCalendar(Guid id)
        {
            var entity = await _schoolingEventRepository.GetById(id);
            if (entity == null)
            {
                await _bus.RaiseEvent(new DomainNotification("GenerateCalendar", $"Event with id {id} doesn't exist"));
                return null;
            }

            var daysToPack = entity.Schedule.ToList();
            var eventLocation = entity.Location;
            var geographicLocation = new GeographicLocation(eventLocation.Lat, eventLocation.Lng);

            var calendarEvents = daysToPack.Select(d => new CalendarEvent
            {
                Start = new CalDateTime(d.Start),
                End = new CalDateTime(d.End),
                Description = d.Description,
                Location = eventLocation.Description,
                GeographicLocation = geographicLocation,
                Summary = d.Title
            });

            var calendar = new Calendar();
            calendar.Events.AddRange(calendarEvents);

            return calendar;
        }

        private IQueryable<SchoolingEvent> ApplyFilters(IQueryable<SchoolingEvent> query,
            SchoolingEventFilterViewModel filter)
        {
            // Date
            if (filter.DateStart.HasValue)
            {
                query = query.Where(e => e.Schedule.Any() && e.Schedule.Min(d => d.Start) >= filter.DateStart.Value);
            }
            if (filter.DateEnd.HasValue)
            {
                query = query.Where(e => e.Schedule.Any() && e.Schedule.Max(d => d.End) <= filter.DateEnd.Value);
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

            // Only favorites for current user
            if (filter.OnlyFavorites.HasValue)
            {
                Func<SchoolingEventFollower, bool> followPredicate = f => f.UserId == _user.Id;
                query = filter.OnlyFavorites.Value ? 
                    query.Where(e => e.Followers.Any(f => followPredicate(f))) : 
                    query.Where(e => e.Followers.Any(f => !followPredicate(f)));
            }

            // Only private for current user
            if (filter.OnlyPrivate.HasValue)
            {
                Func<SchoolingEvent, bool> privatePredicate = e => !e.IsPublic && e.CreatedByUserId == _user.Id;
                query = filter.OnlyPrivate.Value ? 
                    query.Where(e => privatePredicate(e)) : 
                    query.Where(e => !privatePredicate(e));
            }

            //Only created by current user
            if (filter.OnlyMy.HasValue)
            {
                Func<SchoolingEvent, bool> onlyMyPredicate = e => e.CreatedByUserId == _user.Id;
                query = filter.OnlyMy.Value ?
                    query.Where(e => onlyMyPredicate(e)) :
                    query.Where(e => !onlyMyPredicate(e));
            }

            //Tags by its value
            if (filter.TagValues != null && filter.TagValues.Any())
            {
                query = query.Where(e =>
                    e.Schedule.SelectMany(d => d.Tags).Any(t => filter.TagValues.Any(v => v == t.Value)));
            }

            return query;
        }

        private IQueryable<SchoolingEvent> ApplySort(IQueryable<SchoolingEvent> query, SchoolingEventSortType sort)
        {
            Expression<Func<SchoolingEvent, decimal>> minTicketPricePredicate = e => e.AvailableTickets.Any() ? e.AvailableTickets.Min(t => t.Price) : decimal.MaxValue;
            switch (sort)
            {
                case SchoolingEventSortType.TicketPriceAscending:
                    query = query.OrderBy(minTicketPricePredicate);
                    break;
                case SchoolingEventSortType.TicketPriceDescending:
                    query = query.OrderByDescending(minTicketPricePredicate);
                    break;
            }

            return query;
        }
    }
}
