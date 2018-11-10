using System;
using System.Collections.Generic;
using System.Text;
using JetAnotherEMS.Domain.Interfaces;
using JetAnotherEMS.Domain.Models;
using JetAnotherEMS.Infrastructure.Data.Context;

namespace JetAnotherEMS.Infrastructure.Data.Repository
{
    public class SchoolingEventFollowerRepository : EntityFrameworkRepository<SchoolingEventFollower>, ISchoolingEventFollowerRepository
    {
        public SchoolingEventFollowerRepository(JetAnotherEmsContext context) : base(context)
        {
        }
    }
}
