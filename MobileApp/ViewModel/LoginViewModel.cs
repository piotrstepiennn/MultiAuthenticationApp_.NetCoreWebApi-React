using CommunityToolkit.Mvvm.Input;
using IntelliJ.Lang.Annotations;
using MobileApp.Models;
using MobileApp.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MobileApp.ViewModel
{
    public partial class LoginViewModel : BaseViewModel
    {

        public string Email { get; set; }
        public string MobilePassword { get; set; }
        LoginService loginService;

        public LoginViewModel(LoginService loginService)
        {
            Title = "Login";
            this.loginService = loginService;
        }

        [RelayCommand]
        async Task Login()
        {
            try
            {
               
                User user = new User();
                user.Email = Email;
                user.MobilePassword= MobilePassword;
                User newUser = await loginService.GetUser(user);
                if (newUser == null) 
                {
                    await Shell.Current.DisplayAlert("Error!", "Invalid email or password!", "Ok");
                    
                    return;
                }
                await Shell.Current.DisplayAlert("Error!", $"username: {newUser.userName}, code: {newUser.mobileAppAuthcode}", "Ok");
            }
            catch(Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                await Shell.Current.DisplayAlert("Error!","Something went wrong!","Ok");
            }
        }
    }
}
