namespace JetAnotherEMS.Domain.Models
{
    public class SchoolingEventDayTag : Tag
    {

        public virtual SchoolingEvent Event { get; set; }
    }
}
