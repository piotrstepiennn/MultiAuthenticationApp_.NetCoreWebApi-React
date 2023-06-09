using FluentValidation;
using MultiAuthenticationAppAPI.Entities;
using System.Text.RegularExpressions;

namespace MultiAuthenticationAppAPI.Validators
{
    public class RegisterUserValidator : AbstractValidator<User>
    {
        public RegisterUserValidator(UserDbContext dbContext)
        {
            RuleFor(x => x.Email)
                .NotEmpty()
                .EmailAddress();
            RuleFor(x => x.Password)
                .NotEmpty()
                .MinimumLength(7).WithMessage("Password should have at least 7 characters");
            RuleFor(x => x.Answer).NotEmpty().WithMessage("Answer can't be empty");

            RuleFor(x => x.MobilePassword).NotEmpty().MinimumLength(7).WithMessage("Password should have at least 7 characters");
            RuleFor(x => x.Question).NotEmpty().WithMessage("Question can't be empty");
            RuleFor(x => x.UserName).NotEmpty().WithMessage("Username can't be empty");
            RuleFor(x => x.AuthPassword).NotEmpty().MinimumLength(9).WithMessage("Auth Password should have at least 9 characters");

            RuleFor(x => x.Email).Custom((value, context) =>
            {
                var emailTaken = dbContext.Users.Any(u => u.Email == value);
                if (emailTaken)
                {
                    context.AddFailure("Error", "Some data is taken!");
                }
            });
             RuleFor(x => x.UserName).Custom((value, context) =>
            {
                var userNameTaken = dbContext.Users.Any(u => u.UserName == value);
                if (userNameTaken)
                {
                    context.AddFailure("Error", "Some data is taken!");
                }
            });
        }
    }
}
