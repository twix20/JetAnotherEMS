using System;
using System.Collections.Generic;
using JetAnotherEMS.Domain.Core.Validation;
using JetAnotherEMS.Domain.Models;
using JetAnotherEMS.Domain.Validation;

namespace JetAnotherEMS.Domain.Commands.SchoolingEvent
{
    public class CreateNewSchoolingEventCommand : SchoolingEventCommand
    {
        public CreateNewSchoolingEventCommand(
            Guid id,
            string title, 
            string description, 
            bool isPublic,
            SchoolingEventAddress location,
            ICollection<SchoolingEventDay> calendar, 
            ICollection<SchoolingEventTicket> tickets,
            ICollection<SchoolingEventGalleryFile> gallery) : base(id, title, description, isPublic, location, calendar, tickets, gallery)
        {
            location.Id = Guid.Empty;

            foreach (var day in calendar)
            {
                day.Id = Guid.Empty;

                foreach (var tag in day.Tags)
                {
                    tag.Id = Guid.Empty;
                }
            }

            foreach (var ticket in tickets)
            {
                ticket.Id = Guid.Empty;
            }
        }

        public override bool IsValid(IValidationService validationService)
        {
            ValidationResult = validationService
                .Validate<CreateNewSchoolingEventCommand, CreateNewSchoolingEventCommandValidator>(this);

            return ValidationResult.IsValid;
        }
    }
}
