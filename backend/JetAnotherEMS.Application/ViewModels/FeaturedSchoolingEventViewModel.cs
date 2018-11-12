using System;
using System.Collections.Generic;

namespace JetAnotherEMS.Application.ViewModels
{
    public class FeaturedSchoolingEventViewModel : EntityViewModel
    {
        public string Title { get; set; }

        public string Description { get; set; }

        public bool IsPublic { get; set; }

        public DateTime StartingDateTime { get; set; }

        public DateTime EndingDateTime { get; set; }

        public int ScheduleDaysCount { get; set; }

        public List<string> TeacherNames { get; set; }

        public SchoolingEventAddressViewModel Location { get; set; }

        public List<SchoolingEventDayTagViewModel> FeaturedTags { get; set; }

        public List<SchoolingEventGalleryFileViewModel> Gallery { get; set; }

        public long TicketsLeftCount { get; set; }

        public decimal MinTicketPrice { get; set; }

        public bool? IsFollowing { get; set; }

        public bool HasCreated { get; set; }
    }
}
