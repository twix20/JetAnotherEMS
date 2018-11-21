using System.ComponentModel.DataAnnotations;
using JetAnotherEMS.Domain.Core.Models;

namespace JetAnotherEMS.Domain.Models
{
    public class Tag : Entity
    {
        [Required]
        [MaxLength(256)]
        public string Value { get; set; }

        [MaxLength(256)]
        public string Description { get; set; }
    }
}
