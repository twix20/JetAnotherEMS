using System;
using System.Collections.Generic;
using System.Text;
using JetAnotherEMS.Domain.Core.Commands;
using JetAnotherEMS.Domain.Core.Validation;

namespace JetAnotherEMS.Domain.Commands.User
{
    public abstract class UserCommand : Command
    {
        public Guid Id { get; set; }

        public string Email { get; set; }

        public string Name { get; set; }

        public string Password { get; set; }

        public string PasswordConfirmation { get; set; }

        public UserType UserType { get; set; }
    }

    public enum UserType
    {
        Normal,
        Company
    }
}
