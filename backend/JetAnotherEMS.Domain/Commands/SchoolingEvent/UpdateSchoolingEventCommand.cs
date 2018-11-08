using System;
using System.Collections.Generic;
using System.Text;
using JetAnotherEMS.Domain.Core.Commands;
using JetAnotherEMS.Domain.Models;

namespace JetAnotherEMS.Domain.Commands.SchoolingEvent
{
    public class UpdateSchoolingEventCommand : SchoolingEventCommand
    {
        /// <summary>
        /// Id of the event to update
        /// </summary>
        public Guid Id { get; set; }

        public UpdateSchoolingEventCommand(
            Guid id,
            string title, 
            string description, 
            bool isPublic, 
            SchoolingEventAddress location, 
            ICollection<SchoolingEventDay> calendar, 
            ICollection<SchoolingEventTicket> tickets,
            ICollection<SchoolingEventGalleryFile> gallery) : base(title, description, isPublic, location, calendar, tickets, gallery)
        {
            this.Id = id;
        }
    }
}
