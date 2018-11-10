using System;

namespace JetAnotherEMS.Application.ViewModels
{
    public class ChangeFollowSchoolingEventViewModel
    {
        public Guid EventId { get; set; }

        public Guid UserId { get; set; }

        /// <summary>
        /// New following requested state
        /// </summary>
        public bool IsFollowing { get; set; }
    }
}
