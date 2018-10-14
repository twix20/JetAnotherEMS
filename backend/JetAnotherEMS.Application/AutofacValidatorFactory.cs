using System;
using FluentValidation;

namespace JetAnotherEMS.Application
{
    public class AutofacValidatorFactory : ValidatorFactoryBase
    {
        private readonly IServiceProvider _serviceProvider;

        public AutofacValidatorFactory(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public override IValidator CreateInstance(Type validatorType)
        {
            var validator = _serviceProvider.GetService(validatorType) as IValidator; ;
            return validator;
        }
    }
}
