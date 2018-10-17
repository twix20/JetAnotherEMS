using System;
using System.Collections.Generic;
using System.Text;

namespace JetAnotherEMS.Application.ViewModels
{
    public class SchoolingEventAddressViewModel : EntityViewModel
    {
        public string Street { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string ZipCode { get; set; }
        public string Country { get; set; }
    }
}
