using System.Collections.Generic;

namespace JetAnotherEMS.Application.ViewModels
{
    public class SchoolingEventViewModel : EntityViewModel
    {
        public string Title { get; set; }

        public string Description { get; set; }

        public int ScheduleDaysCount { get; set; }

        public List<SchoolingEventDayTagViewModel> FeaturedTags { get; set; }
    }
}
