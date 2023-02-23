using MobileApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace MobileApp.Services
{
    public class LoginService
    {
        HttpClient httpClient;
        public LoginService(HttpClient httpClient) 
        {
            httpClient = new HttpClient();
        }
        //User user = new User();
        public async Task<User> GetUser(User user)
        {
            var url = "https://localhost:7033/";
            HttpContent httpContent = new StringContent(user.ToString());
            var response = await httpClient.PostAsync(url, httpContent);
            Console.WriteLine(response.Content);
            return user;
        }
    }
}
