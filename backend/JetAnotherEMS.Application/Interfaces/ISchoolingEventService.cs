using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using JetAnotherEMS.Application.ViewModels;
using JetAnotherEMS.Domain.Models;

namespace JetAnotherEMS.Application.Interfaces
{
    public interface ISchoolingEventService
    {
        Task<IEnumerable<SchoolingEventViewModel>> GetFeaturedEvents(int page, int pageSize);

        Task<SchoolingEventViewModel> GetById(Guid id);

        Task Create(SchoolingEventViewModel viewModel);
    }
}
