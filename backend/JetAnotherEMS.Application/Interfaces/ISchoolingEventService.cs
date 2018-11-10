using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using JetAnotherEMS.Application.ViewModels;

namespace JetAnotherEMS.Application.Interfaces
{
    public interface ISchoolingEventService
    {
        Task<FeaturedSchoolingEventViewModel> GetById(Guid id);

        Task<IEnumerable<FeaturedSchoolingEventViewModel>> GetFeaturedEvents(SchoolingEventFilterViewModel filter, SchoolingEventSortType sort, int page, int pageSize);

        Task<IEnumerable<SchoolingEventTicketViewModel>> GetTickets(Guid id);

        Task<IEnumerable<SchoolingEventDayViewModel>> GetSchedule(Guid id);

        Task Create(CreateSchoolingEventViewModel viewModel);

        Task Update(UpdateSchoolingEventViewModel viewModel);

        Task<IEnumerable<SchoolingEventParticipantViewModel>> GetParticipants(Guid id);

        Task ChangeSchoolingEventFollow(ChangeFollowSchoolingEventViewModel viewModel);
    }
}
