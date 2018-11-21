using System;
using System.Collections.Generic;
using System.Text;
using JetAnotherEMS.Domain.Core.Commands;
using JetAnotherEMS.Domain.Models;

namespace JetAnotherEMS.Domain.Commands.SchoolingEvent
{
    public class UpdateSchoolingEventCommand : SchoolingEventCommand
    {
        public UpdateSchoolingEventCommand(
            Guid id,
            string title, 
            string description, 
            bool isPublic, 
            SchoolingEventAddress location, 
            ICollection<SchoolingEventDay> calendar, 
            ICollection<SchoolingEventTicket> tickets,
            ICollection<SchoolingEventGalleryFile> gallery) : base(id, title, description, isPublic, location, calendar, tickets, gallery)
        {
        }
    }
}
