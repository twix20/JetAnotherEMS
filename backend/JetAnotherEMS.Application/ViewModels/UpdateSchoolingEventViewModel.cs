using System;
using System.Collections.Generic;
using System.Text;

namespace JetAnotherEMS.Application.ViewModels
{
    public class UpdateSchoolingEventViewModel : EntityViewModel
    {
        public string Title { get; set; }

        public string Description { get; set; }

        public SchoolingEventAddressViewModel Location { get; set; }

        //TODO: add more members
    }
}
