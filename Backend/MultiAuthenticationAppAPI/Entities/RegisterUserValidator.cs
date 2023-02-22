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
                .MinimumLength(7).WithMessage("Password should have at least 7 characters");
            RuleFor(x => x.Answer).NotEmpty().WithMessage("Answer can't be empty");

            RuleFor(x => x.MobilePassword).NotEmpty().MinimumLength(4).WithMessage("Password should have at least 4 characters");
            RuleFor(x => x.Question).NotEmpty().WithMessage("Answer can't be empty");
            RuleFor(x => x.UserName).NotEmpty().WithMessage("Answer can't be empty");
            RuleFor(x => x.AuthPassword).NotEmpty().MinimumLength(9).WithMessage("Auth Password should have at least 9 characters");
            
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
