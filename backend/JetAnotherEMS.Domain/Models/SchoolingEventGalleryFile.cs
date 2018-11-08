using System;
using System.ComponentModel.DataAnnotations.Schema;
using JetAnotherEMS.Domain.Core.Models;

namespace JetAnotherEMS.Domain.Models
{
    public class SchoolingEventGalleryFile : UploadedFile
    {
        public Guid EventId { get; set; }
        [ForeignKey("EventId")]
        public virtual SchoolingEvent Event { get; set; }
    }
}
