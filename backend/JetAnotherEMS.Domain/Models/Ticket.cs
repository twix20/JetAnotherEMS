using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using JetAnotherEMS.Domain.Core.Models;

namespace JetAnotherEMS.Domain.Models
{
    public class Ticket : Entity
    {
        [Required]
        [MaxLength(256)]
        public string Name { get; set; }

        [Required]
        [Range(0.0, double.MaxValue)]
        public decimal Price { get; set; }

        [Required]
        public uint TotalQuantity { get; set; }

        [Required]
        [MaxLength(32)]
        public string Currency { get; set; }
    }
}
