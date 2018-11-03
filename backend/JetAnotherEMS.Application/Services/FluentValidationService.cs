using System;
using FluentValidation.Results;
using JetAnotherEMS.Domain.Core.Validation;
using FluentValidation;

namespace JetAnotherEMS.Application.Services
{
    public class FluentValidationService : IValidationService
    {
        private readonly IValidatorFactory _validatorFactory;
        private readonly AutofacValidatorFactory _autofacValidatorFactory;

        public FluentValidationService(
            IValidatorFactory validatorFactory, 
            AutofacValidatorFactory autofacValidatorFactory)
        {
            _validatorFactory = validatorFactory;
            _autofacValidatorFactory = autofacValidatorFactory;
        }

        public ValidationResult Validate<T>(T entity)
        {
            var validator = _validatorFactory.GetValidator(entity.GetType());
            var result = validator.Validate(entity);

            return result;
        }

        public ValidationResult Validate<T, TValidator>(T entity)
        {
            var validator = _autofacValidatorFactory.CreateInstance(typeof(TValidator));
            var result = validator.Validate(entity);

            return result;
        }
    }
}
