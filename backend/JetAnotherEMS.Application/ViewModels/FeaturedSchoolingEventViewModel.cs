using System;
using System.Collections.Generic;

namespace JetAnotherEMS.Application.ViewModels
{
    public class FeaturedSchoolingEventViewModel : EntityViewModel
    {
        public string Title { get; set; }

        public string Description { get; set; }

        public DateTime StartingDateTime { get; set; }

        public int ScheduleDaysCount { get; set; }

        public List<string> TeacherNames { get; set; }

        public SchoolingEventAddressViewModel Location { get; set; }

        public List<SchoolingEventDayTagViewModel> FeaturedTags { get; set; }
        //TODO: tickets left count
        //TODO: ticket min price
    }
}
