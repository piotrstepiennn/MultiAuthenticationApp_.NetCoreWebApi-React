using CommunityToolkit.Mvvm.Input;
using IntelliJ.Lang.Annotations;
using MobileApp.Models;
using MobileApp.Services;
using MobileApp.View;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MobileApp.ViewModel
{
    public partial class LoginViewModel : BaseViewModel
    {
        //public User user = new User();

        public string Email { get; set; }
        public string MobilePassword { get; set; }
        public string AuthCode { get; set; }
        public string UserName { get; set; }
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
                User _user = new User();
                _user.Email = Email;
                _user.MobilePassword= MobilePassword;
                _user = await loginService.GetUser(_user);
                if (_user == null) 
                {
                    await Shell.Current.DisplayAlert("Error!", "Invalid email or password!", "Ok");
                    return;
                }
                else
                {
                    AuthCode = _user.mobileAppAuthcode;
                    UserName = _user.userName;
                    await Shell.Current.GoToAsync($"//{nameof(CodePage)}");
                    //await Shell.Current.DisplayAlert("Error!", $"username: {user.userName}, code: {user.mobileAppAuthcode}", "Ok");
                }

            }
            catch(Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                await Shell.Current.DisplayAlert("Error!","Something went wrong!","Ok");
            }
        }
    }
}
