using System.ComponentModel.DataAnnotations;
using JetAnotherEMS.Domain.Core.Models;

namespace JetAnotherEMS.Domain.Models
{
    public class GoogleMapsAddress : Entity
    {
        [Required]
        [MaxLength(256)]
        public string Description { get; set; }

        [Required]
        public float Lat { get; set; }

        [Required]
        public float Lng { get; set; }
    }
}
