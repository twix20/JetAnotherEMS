using System;
using Newtonsoft.Json;

namespace JetAnotherEMS.Application.ViewModels
{
    public class EntityViewModel
    {
        public Guid Id { get; set; }

        [JsonIgnore]
        public Guid CreatedByUserId { get; set; }

        [JsonIgnore]
        public DateTime CreatedAt { get; set; }

        [JsonIgnore]
        public Guid UpdatedByUserId { get; set; }

        [JsonIgnore]
        public DateTime UpdatedAt { get; set; }
    }
}
