using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace JetAnotherEMS.Domain.Models
{
    public class SchoolingEventFollower : Follower
    {
        public Guid EventId { get; set; }

        [ForeignKey("EventId")]
        public virtual SchoolingEvent Event { get; set; }
    }
}
