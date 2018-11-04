using JetAnotherEMS.Domain.Core.Models;

namespace JetAnotherEMS.Domain.Models
{
    public class GoogleMapsAddress : Entity
    {
        public string Description { get; set; }

        public float Lat { get; set; }

        public float Lng { get; set; }
    }
}
