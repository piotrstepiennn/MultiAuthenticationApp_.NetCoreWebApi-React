using FluentValidation;

namespace MultiAuthenticationAppAPI.Entities
{
    public class RegisterUserValidator : AbstractValidator<User>
    {
        public RegisterUserValidator(UserDbContext  dbContext)
        {
            RuleFor(x => x.Email)
                .NotEmpty()
                .EmailAddress();
            RuleFor(x => x.Password)
                .NotEmpty()
                .MinimumLength(7);
            RuleFor(x => x.Answer).NotEmpty();

            RuleFor(x => x.MobilePassword).NotEmpty().MinimumLength(4);
            RuleFor(x => x.Question).NotEmpty();
            RuleFor(x => x.UserName).NotEmpty();

            RuleFor(x => x.Email).Custom((value, context) =>
            {
                var emailTaken = dbContext.Users.Any(u => u.Email == value);
                if (emailTaken)
                {
                    context.AddFailure("Email", "Email already taken!");
                }
            });

            RuleFor(x => x.UserName).Custom((value, context) =>
            {
                var userNameTaken = dbContext.Users.Any(u => u.UserName == value);
                if (userNameTaken)
                {
                    context.AddFailure("UserName", "UserName already taken!");
                }
            });
        }
    }
}
