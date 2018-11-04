using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using JetAnotherEMS.Domain.Models;

namespace JetAnotherEMS.Domain.Interfaces
{
    public interface ISchoolingEventDayTagRepository : IRepository<SchoolingEventDayTag>
    {
        Task<List<SchoolingEventDayTag>> Search(string query);
    }
}
