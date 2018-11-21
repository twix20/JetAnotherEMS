using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using JetAnotherEMS.Domain.Core.Models;

namespace JetAnotherEMS.Domain.Models
{
    public class SchoolingEvent : Entity
    {
        [Required]
        [MaxLength(256)]
        public string Title { get; set; }

        [Required]
        [MaxLength(10240)]
        public string Description { get; set; }

        [Required]
        [DefaultValue(false)]
        public bool IsPublic { get; set; }

        public virtual SchoolingEventAddress Location { get; set; }

        public virtual ICollection<SchoolingEventGalleryFile> Gallery { get; set; }

        public virtual ICollection<SchoolingEventDay> Schedule { get; set; }

        public virtual ICollection<UserSchoolingEventTicket> ParticipantsTickets { get; set; }

        public virtual ICollection<SchoolingEventTicket> AvailableTickets { get; set; }

        public virtual ICollection<SchoolingEventFollower> Followers { get; set; }
    }
}
