using System.Collections.Generic;

namespace JetAnotherEMS.Application.ViewModels
{
    public class CreateSchoolingEventViewModel : EntityViewModel
    {
        public string Title { get; set; }

        public string Description { get; set; }

        public bool IsPublic { get; set; }

        public SchoolingEventAddressViewModel Location { get; set; }

        public ICollection<SchoolingEventDayViewModel> Calendar { get; set; }

        public ICollection<SchoolingEventTicketViewModel> Tickets { get; set; }

        public ICollection<SchoolingEventGalleryFileViewModel> Gallery { get; set; }
    }
}
