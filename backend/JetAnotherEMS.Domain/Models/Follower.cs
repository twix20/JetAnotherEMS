using System;
using JetAnotherEMS.Domain.Core.Models;

namespace JetAnotherEMS.Domain.Models
{
    public class Follower : Entity
    {
        public Guid UserId { get; set; }
    }
}
