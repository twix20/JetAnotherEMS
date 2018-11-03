namespace JetAnotherEMS.Application.ViewModels
{
    public class SchoolingEventTicketViewModel : EntityViewModel
    {
        public string Name { get; set; }

        public decimal Price { get; set; }

        public uint TotalQuantity { get; set; }

        public string Currency { get; set; }

        public uint UsersBoughtThisTicket { get; set; }
    }
}
