using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace JetAnotherEMS.Domain.Models
{
    public class SchoolingEventAddress : GoogleMapsAddress
    {
        public Guid EventId { get; set; }

        [ForeignKey("EventId")]
        public virtual SchoolingEvent Event { get; set; }
    }
}
