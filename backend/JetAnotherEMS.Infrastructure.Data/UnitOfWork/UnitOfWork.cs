using System;
using System.Threading.Tasks;
using JetAnotherEMS.Domain.Interfaces;
using JetAnotherEMS.Infrastructure.Data.Context;
using Microsoft.EntityFrameworkCore;

namespace JetAnotherEMS.Infrastructure.Data.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly JetAnotherEmsContext _context;

        public UnitOfWork(JetAnotherEmsContext context)
        {
            _context = context;
        }

        public async Task<bool> Commit()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
