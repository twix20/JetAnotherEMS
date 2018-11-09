using System;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace JetAnotherEMS.Domain.Models
{
    public class SchoolingEventDayAttachment : UploadedFile
    {
        public Guid SchoolingEventDayId { get; set; }

        [ForeignKey("SchoolingEventDayId")]
        public virtual SchoolingEventDay SchoolingEventDay { get; set; }
    }
}
