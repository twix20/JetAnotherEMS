using JetAnotherEMS.Domain.Core.Models;

namespace JetAnotherEMS.Domain.Models
{
    public class Attachment : Entity
    {
        public string NameToStore { get; set; }

        public string NameOriginal { get; set; }

        public string Extension { get; set; }

        public byte[] Content { get; set; }
    }
}
