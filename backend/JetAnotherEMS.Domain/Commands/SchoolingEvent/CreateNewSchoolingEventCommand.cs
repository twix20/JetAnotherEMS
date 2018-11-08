using System.Collections.Generic;
using JetAnotherEMS.Domain.Core.Validation;
using JetAnotherEMS.Domain.Models;
using JetAnotherEMS.Domain.Validation;

namespace JetAnotherEMS.Domain.Commands.SchoolingEvent
{
    public class CreateNewSchoolingEventCommand : SchoolingEventCommand
    {
        public CreateNewSchoolingEventCommand(
            string title, 
            string description, 
            bool isPublic,
            SchoolingEventAddress location,
            ICollection<SchoolingEventDay> calendar, 
            ICollection<SchoolingEventTicket> tickets,
            ICollection<SchoolingEventGalleryFile> gallery) : base(title, description, isPublic, location, calendar, tickets, gallery)
        {
        }

        public override bool IsValid(IValidationService validationService)
        {
            ValidationResult = validationService
                .Validate<CreateNewSchoolingEventCommand, CreateNewSchoolingEventCommandValidator>(this);

            return ValidationResult.IsValid;
        }
    }
}
