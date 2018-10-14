using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JetAnotherEMS.Domain.Interfaces
{
    public interface IRepository<TEntity> : IDisposable where TEntity : class
    {
        Task Add(TEntity obj);
        Task<TEntity> GetById(Guid id);
        IQueryable<TEntity> GetAll();
        Task Update(TEntity obj);
        Task Remove(Guid id);
        Task<int> SaveChanges();
    }
}
