using FluentValidation;
using MultiAuthenticationAppAPI.Entities;
using MultiAuthenticationAppAPI.Models;
using System.Text.RegularExpressions;

namespace MultiAuthenticationAppAPI.Validators
{
    public class ChangeEmailValidator : AbstractValidator<ChangeEmailDto>
    {
        public ChangeEmailValidator(UserDbContext dbContext)
        {
            RuleFor(x => x.NewEmail)
                .NotEmpty()
                .EmailAddress();
            RuleFor(x => x.NewEmail).Custom((value, context) =>
            {
                var emailTaken = dbContext.Users.Any(u => u.Email == value);
                if (emailTaken)
                {
                    context.AddFailure("Email", "Email already taken!");
                }
            });
        }
    }
}
