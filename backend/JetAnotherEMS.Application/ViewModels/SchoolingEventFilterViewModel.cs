using System;

namespace JetAnotherEMS.Application.ViewModels
{
    public class SchoolingEventFilterViewModel
    {
        public DateTime? DateFrom { get; set; }
        public DateTime? DateTo { get; set; }

        public decimal? PriceFrom { get; set; }
        public decimal? PriceTo { get; set; }

        public bool? OnlyFavorites { get; set; }

        public bool? OnlyOngoing { get; set; }
    }
}
