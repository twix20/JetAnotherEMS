using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using JetAnotherEMS.Domain.Core.Models;

namespace JetAnotherEMS.Domain.Models
{
    public class SchoolingEventDay : Entity
    {
        public DateTime Start { get; set; }

        public DateTime End { get; set; }

        [Required]
        [MaxLength(256)]
        public string Title { get; set; }

        [Required]
        [MaxLength(10240)]
        public string Description { get; set; }

        [Required]
        [MaxLength(256)]
        public string Teacher { get; set; }

        [Required]
        [MaxLength(256)]
        public string LectureRoom { get; set; }

        public virtual ICollection<SchoolingEventDayTag> Tags { get; set; }

        public virtual ICollection<SchoolingEventDayAttachment> Attachments { get; set; }

        public virtual SchoolingEvent Event { get; set; }
    }
}
