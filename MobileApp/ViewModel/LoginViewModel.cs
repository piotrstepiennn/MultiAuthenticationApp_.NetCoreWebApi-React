using CommunityToolkit.Mvvm.Input;
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
        public string MobileAppPassword { get; set; }

        public LoginViewModel()
        {
            Title = "Login";
        }

        [RelayCommand]
        async Task Login()
        {
            try
            {
                Console.WriteLine("test");
            }
            catch(Exception ex)
            {

            }
        }
    }
}
