using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using JetAnotherEMS.Application.ViewModels;
using JetAnotherEMS.Domain.Models;

namespace JetAnotherEMS.Application.Interfaces
{
    public interface ISchoolingEventService
    {
        Task<IEnumerable<FeaturedSchoolingEventViewModel>> GetFeaturedEvents(SchoolingEventFilterViewModel filter, int page, int pageSize);

        Task<FeaturedSchoolingEventViewModel> GetFeaturedById(Guid id);

        Task<IEnumerable<SchoolingEventDayViewModel>> GetSchedule(Guid id);

        Task Create(FeaturedSchoolingEventViewModel viewModel);
    }
}
