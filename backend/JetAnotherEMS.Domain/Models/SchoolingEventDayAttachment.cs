namespace JetAnotherEMS.Domain.Models
{
    public class SchoolingEventDayAttachment : UploadedFile
    {


        public virtual SchoolingEventDay SchoolingEventDay { get; set; }
    }
}
