using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using JetAnotherEMS.Application.ViewModels;
using JetAnotherEMS.Domain.Models;

namespace JetAnotherEMS.Application.Interfaces
{
    public interface ISchoolingEventService
    {
        Task<IEnumerable<FeaturedSchoolingEventViewModel>> GetFeaturedEvents(int page, int pageSize);

        Task<FeaturedSchoolingEventViewModel> GetById(Guid id);

        Task Create(FeaturedSchoolingEventViewModel viewModel);
    }
}
