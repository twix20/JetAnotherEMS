using System;
using System.Collections.Generic;
using System.Text;

namespace JetAnotherEMS.Application.ViewModels
{
    public class CreateSchoolingEventViewModel : EntityViewModel
    {
        public string Title { get; set; }

        public string Description { get; set; }

        public SchoolingEventAddressViewModel Location { get; set; }

        //TODO: add more members
        public List<SchoolingEventDayViewModel> Calendar { get; set; }
    }
}
