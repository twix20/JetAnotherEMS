using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using JetAnotherEMS.Application.ViewModels;
using JetAnotherEMS.Domain.Models;

namespace JetAnotherEMS.Application.Interfaces
{
    public interface ISchoolingEventDayTagService
    {
        Task<IEnumerable<SchoolingEventDayTagViewModel>> Search(string query);
    }
}
