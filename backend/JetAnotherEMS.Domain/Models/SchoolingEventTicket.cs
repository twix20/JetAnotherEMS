using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace JetAnotherEMS.Domain.Models
{
    public class SchoolingEventTicket : Ticket
    {
        public Guid EventId { get; set; }

        [Required]
        [ForeignKey("EventId")]
        public virtual SchoolingEvent Event { get; set; }
    }
}
