using System;
using System.Collections.Generic;

namespace JetAnotherEMS.Application.ViewModels
{
    public class SchoolingEventDayViewModel : EntityViewModel
    {
        public DateTime Start { get; set; }

        public DateTime End { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string Teacher { get; set; }

        public string LectureRoom { get; set; }

        public ICollection<SchoolingEventDayTagViewModel> Tags { get; set; }

        public ICollection<SchoolingEventDayAttachmentViewModel> Attachments { get; set; }
    }
}
