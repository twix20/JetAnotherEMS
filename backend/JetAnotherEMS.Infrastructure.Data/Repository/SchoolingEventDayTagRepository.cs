using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using JetAnotherEMS.Domain.Interfaces;
using JetAnotherEMS.Domain.Models;
using JetAnotherEMS.Infrastructure.Data.Context;
using Microsoft.EntityFrameworkCore;

namespace JetAnotherEMS.Infrastructure.Data.Repository
{
    public class SchoolingEventDayTagRepository : EntityFrameworkRepository<SchoolingEventDayTag>, ISchoolingEventDayTagRepository
    {
        public SchoolingEventDayTagRepository(JetAnotherEmsContext context) : base(context)
        {
        }

        public Task<List<SchoolingEventDayTag>> Search(string query)
        {
            return DbSet.Where(t => 
                t.Value.Contains(query) || 
                (t.Description != null && t.Description.Contains(query)))
            .ToListAsync();
        }
    }
}
