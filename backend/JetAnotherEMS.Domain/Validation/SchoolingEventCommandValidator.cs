using System;
using System.Collections.Generic;
using System.Text;
using FluentValidation;
using JetAnotherEMS.Domain.Commands.SchoolingEvent;

namespace JetAnotherEMS.Domain.Validation
{
    public abstract class SchoolingEventCommandValidator : AbstractValidator<SchoolingEventCommand>
    {
        public void ValidateTitle()
        {
            RuleFor(x => x.Title)
                .NotNull()
                .NotEmpty()
                .MaximumLength(200);
        }

        public void ValidateDescription()
        {
            RuleFor(x => x.Description)
                .NotNull()
                .NotEmpty()
                .MaximumLength(1024);
        }
    }
}
