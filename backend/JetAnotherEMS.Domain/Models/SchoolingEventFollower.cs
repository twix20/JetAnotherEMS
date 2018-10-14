using System;
using System.Collections.Generic;
using System.Text;

namespace JetAnotherEMS.Domain.Models
{
    public class SchoolingEventFollower : Follower
    {
        public virtual SchoolingEvent Event { get; set; }
    }
}
