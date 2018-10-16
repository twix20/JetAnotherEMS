using System.Collections.Generic;
using JetAnotherEMS.Domain.Core.Models;

namespace JetAnotherEMS.Domain.Models
{
    public class SchoolingEvent : Entity
    {
        public string Title { get; set; }

        public string Description { get; set; }

        public virtual SchoolingEventAddress Location { get; set; }

        public virtual ICollection<SchoolingEventDayAttachment> Gallery { get; set; }

        public virtual ICollection<SchoolingEventDay> Schedule { get; set; }

        public virtual ICollection<UserSchoolingEventTicket> ParticipantsTickets { get; set; }

        public virtual ICollection<SchoolingEventTicket> AvailableTickets { get; set; }

        public virtual ICollection<SchoolingEventFollower> Followers { get; set; }
    }
}
