using FluentValidation;
using MultiAuthenticationAppAPI.Entities;
using MultiAuthenticationAppAPI.Models;
using System.Text.RegularExpressions;

namespace MultiAuthenticationAppAPI.Validators
{
    public class ChangeUsernameValidator : AbstractValidator<ChangeUsernameDto>
    {
        public ChangeUsernameValidator(UserDbContext dbContext)
        {
            RuleFor(x => x.NewUserName).Custom((value, context) =>
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
