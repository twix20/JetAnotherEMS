using System;
using FluentValidation.Results;
using JetAnotherEMS.Domain.Core.Events;
using JetAnotherEMS.Domain.Core.Validation;


namespace JetAnotherEMS.Domain.Core.Commands
{
    public abstract class Command : Message
    {
        public DateTime Timestamp { get; private set; }
        public ValidationResult ValidationResult { get; set; }

        protected Command()
        {
            Timestamp = DateTime.Now;
        }

        public virtual bool IsValid(IValidationService validationService)
        {
            ValidationResult = validationService.Validate(this);

            return ValidationResult.IsValid;
        }
    }
}
