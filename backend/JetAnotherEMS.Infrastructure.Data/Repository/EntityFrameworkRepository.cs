using System;
using System.Linq;
using System.Threading.Tasks;
using JetAnotherEMS.Domain.Core.Models;
using JetAnotherEMS.Domain.Interfaces;
using JetAnotherEMS.Infrastructure.Data.Context;
using Microsoft.EntityFrameworkCore;

namespace JetAnotherEMS.Infrastructure.Data.Repository
{
    public class EntityFrameworkRepository<TEntity> : IRepository<TEntity>
        where TEntity : Entity
    {
        protected readonly JetAnotherEmsContext Context;
        protected readonly DbSet<TEntity> DbSet;

        public EntityFrameworkRepository(JetAnotherEmsContext context)
        {
            Context = context;
            DbSet = Context.Set<TEntity>();
        }

        public virtual Task Add(TEntity obj)
        {
            return DbSet.AddAsync(obj);
        }

        public virtual Task<TEntity> GetById(Guid id)
        {
            return DbSet.FindAsync(id);
        }

        public virtual IQueryable<TEntity> GetAll()
        {
            return DbSet;
        }

        public virtual void Update(TEntity obj)
        {
            DbSet.Update(obj);
        }

        public virtual async Task Remove(Guid id)
        {
            var entity = await GetById(id);
            if(entity != null)
                DbSet.Remove(entity);
        }

        public Task<int> SaveChanges()
        {
            return Context.SaveChangesAsync();
        }

        public void Dispose()
        {
            Context.Dispose();
            GC.SuppressFinalize(this);
        }
    }
}
