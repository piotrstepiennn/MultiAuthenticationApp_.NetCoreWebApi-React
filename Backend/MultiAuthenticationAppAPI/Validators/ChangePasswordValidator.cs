using FluentValidation;
using MultiAuthenticationAppAPI.Entities;
using MultiAuthenticationAppAPI.Models;
using System.Text.RegularExpressions;

namespace MultiAuthenticationAppAPI.Validators
{
    public class ChangePasswordValidator : AbstractValidator<ChangePasswordDto>
    {
        public ChangePasswordValidator(UserDbContext dbContext)
        {
            RuleFor(x => x.NewPassword)
                .NotEmpty()
                .MinimumLength(7).WithMessage("Password should have at least 7 characters");
        }
    }
}
