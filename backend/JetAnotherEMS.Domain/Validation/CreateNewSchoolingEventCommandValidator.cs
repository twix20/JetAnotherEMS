using System;
using System.Collections.Generic;
using System.Text;
using FluentValidation;
using JetAnotherEMS.Domain.Commands.SchoolingEvent;

namespace JetAnotherEMS.Domain.Validation
{
    public class CreateNewSchoolingEventCommandValidator : SchoolingEventCommandValidator
    {
        public CreateNewSchoolingEventCommandValidator()
        {
            ValidateTitle();
            ValidateDescription();
        }
    }
}
