using System;
using Autofac;
using FluentValidation;

namespace JetAnotherEMS.Application
{
    public class AutofacValidatorFactory : ValidatorFactoryBase
    {
        private readonly ILifetimeScope _lifetimeScope;

        public AutofacValidatorFactory(ILifetimeScope lifetimeScope)
        {
            _lifetimeScope = lifetimeScope;
        }

        public override IValidator CreateInstance(Type validatorType)
        {
            var validator = _lifetimeScope.Resolve(validatorType) as IValidator; ;
            return validator;
        }
    }
}
