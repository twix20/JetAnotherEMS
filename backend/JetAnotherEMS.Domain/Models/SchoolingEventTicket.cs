namespace JetAnotherEMS.Domain.Models
{
    public class SchoolingEventTicket : Ticket
    {
        public virtual SchoolingEvent Event { get; set; }
    }
}
