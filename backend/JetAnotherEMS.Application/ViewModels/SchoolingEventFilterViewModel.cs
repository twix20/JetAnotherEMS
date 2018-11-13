using System;
using System.Collections.Generic;

namespace JetAnotherEMS.Application.ViewModels
{
    public class SchoolingEventFilterViewModel
    {
        public DateTime? DateStart { get; set; }
        public DateTime? DateEnd { get; set; }

        public decimal? PriceFrom { get; set; }
        public decimal? PriceTo { get; set; }

        public bool? OnlyFavorites { get; set; }

        public bool? OnlyPrivate { get; set; }

        public bool? OnlyMy { get; set; }

        public IEnumerable<string> TagValues { get; set; }
    }

    public enum SchoolingEventSortType
    {
        None = 0,
        TicketPriceAscending,
        TicketPriceDescending
    }
}
