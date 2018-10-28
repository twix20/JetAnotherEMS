using System;
using System.ComponentModel.DataAnnotations;

namespace JetAnotherEMS.Domain.Models
{
    public class SchoolingEventTicket : Ticket
    {
        [Required]
        public virtual SchoolingEvent Event { get; set; }
    }
}
