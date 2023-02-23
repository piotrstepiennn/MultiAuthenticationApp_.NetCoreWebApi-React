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
        public string MobileAppPassword { get; set; } 
        public string UserNamer { get; set; }
        public string AuthCode { get; set; }

        public User()
        {
            Email = "";
            MobileAppPassword = "";
            UserNamer = "";
            AuthCode = "";
        }
    }
}
