namespace JetAnotherEMS.Domain.Commands.User
{
    public class RegisterNewUserCommand : UserCommand
    {
        public RegisterNewUserCommand(string email, string password, string passwordConfirmation, UserType userType)
        {
            Email = email;
            Password = password;
            PasswordConfirmation = passwordConfirmation;
            UserType = userType;
        }
    }
}
