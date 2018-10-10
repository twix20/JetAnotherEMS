using System;
using System.Collections.Generic;
using JetAnotherEMS.Domain.Core.Models;

namespace JetAnotherEMS.Domain.Models
{
    public class SchoolingEventDay : Entity
    {
        public DateTime From { get; set; }

        public DateTime To { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string Teacher { get; set; }

        public string LectureRoom { get; set; }

        public virtual ICollection<SchoolingEventDayAttachment> Attachments { get; set; }

        public virtual ICollection<SchoolingEventDayTag> Tags { get; set; }

        public virtual SchoolingEvent Event { get; set; }
    }
}
