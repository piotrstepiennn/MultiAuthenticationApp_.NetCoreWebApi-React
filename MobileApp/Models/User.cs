using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MobileApp.Models
{
    public class User
    {
        public string Email { get; set; }   
        public string MobilePassword { get; set; } 
        public string userName { get; set; }
        public string mobileAppAuthcode { get; set; }

        public User()
        {
            Email = "";
            MobilePassword = "";
            userName = "";
            mobileAppAuthcode = "";
        }
        public User(string userName, string Authcode)
        {
            Email = "";
            MobilePassword = "";
            this.userName = userName;
            this.mobileAppAuthcode = Authcode;
        }
    }
}
