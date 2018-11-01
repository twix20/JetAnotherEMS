using System;
using System.Collections.Generic;

namespace JetAnotherEMS.Application.ViewModels
{
    public class SchoolingEventDayViewModel : EntityViewModel
    {
        public DateTime From { get; set; }

        public DateTime To { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string Teacher { get; set; }

        public string LectureRoom { get; set; }

        public ICollection<SchoolingEventDayTagViewModel> Tags { get; set; }

        public ICollection<SchoolingEventDayAttachmentViewModel> Attachments { get; set; }
    }
}
