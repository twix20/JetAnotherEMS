using FluentValidation.Results;

namespace JetAnotherEMS.Domain.Core.Validation
{
    public interface IValidationService
    {
        ValidationResult Validate<T>(T entity);
    }
}
