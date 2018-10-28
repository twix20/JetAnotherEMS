using FluentValidation.Results;
using JetAnotherEMS.Domain.Core.Validation;
using FluentValidation;

namespace JetAnotherEMS.Application.Services
{
    public class FluentValidationService : IValidationService
    {
        private readonly IValidatorFactory _validatorFactory;

        public FluentValidationService(IValidatorFactory validatorFactory)
        {
            _validatorFactory = validatorFactory;
        }

        public ValidationResult Validate<T>(T entity)
        {
            var validator = _validatorFactory.GetValidator(entity.GetType());
            var result = validator.Validate(entity);

            return result;
        }
    }
}
