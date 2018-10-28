using System;

namespace JetAnotherEMS.Domain.Core.Models
{
    public abstract class Entity
    {
        public Guid Id { get; set; }

        public Guid CreatedByUserId { get; set; }

        public DateTime CreatedAt { get; set; }

        public Guid UpdatedByUserId { get; set; }

        public DateTime UpdatedAt { get; set; }

        public override string ToString()
        {
            return GetType().Name + " [Id=" + Id + "]";
        }
    }
}
