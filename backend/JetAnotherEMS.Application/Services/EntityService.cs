using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JetAnotherEMS.Application.Interfaces;
using JetAnotherEMS.Domain.Core.Models;
using JetAnotherEMS.Domain.Interfaces;

namespace JetAnotherEMS.Application.Services
{
    public class EntityService<TEntity> : IEntityService<TEntity>
        where TEntity : Entity
    {
        private readonly IRepository<TEntity> _repository;

        public EntityService(IRepository<TEntity> repository)
        {
            _repository = repository;
        }
        public IEnumerable<TEntity> GetAll()
        {
            return _repository.GetAll().ToList();
        }

        public Task<TEntity> GetById(Guid id)
        {
            return _repository.GetById(id);
        }

        public Task Remove(Guid id)
        {
            return _repository.Remove(id);
        }
    }
}
