using System;
using JetAnotherEMS.Domain.Core.Commands;

namespace JetAnotherEMS.Domain.Commands.SchoolingEvent
{
    public class ChangeFollowSchoolingEventCommand : Command
    {
        public Guid EventId { get; set; }

        public Guid UserId { get; set; }

        /// <summary>
        /// New following requested state
        /// </summary>
        public bool IsFollowing { get; set; }

        public ChangeFollowSchoolingEventCommand(Guid eventId, Guid userId, bool isFollowing)
        {
            EventId = eventId;
            UserId = userId;
            IsFollowing = isFollowing;
        }
    }
}
