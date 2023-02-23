using MobileApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace MobileApp.Services
{
    public class LoginService
    {

        public LoginService() 
        {

        }
        //User user = new User();
        public async Task<User> GetUser(User user)
        {
            using (var httpClient = new HttpClient())
            {
                var url = "http://10.0.2.2:5033/mobileAuth";
                HttpContent httpContent = new StringContent(JsonSerializer.Serialize(user), Encoding.UTF8, "application/json");
                var response = await httpClient.PostAsync(url, httpContent);
                if (response.IsSuccessStatusCode)
                {
                    var json = await response.Content.ReadAsStringAsync();
                    var deserializedJson = JsonSerializer.Deserialize<User>(json);
                    user.mobileAppAuthcode= deserializedJson.mobileAppAuthcode;
                    user.userName= deserializedJson.userName;
                    
                }
                else
                {
                   return null;
                }
                
            }
            return user;
        }
    }
}
