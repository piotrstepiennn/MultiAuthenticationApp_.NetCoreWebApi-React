using MultiAuthenticationAppAPI.Models;
using System.Security.Cryptography;
using System.Text;

namespace MultiAuthenticationAppAPI.Services
{
    public interface IHashingService
    {
        string ComputeSha1Hash(HashDto obj);
    }
    public class HashingService : IHashingService
    {
        const string secretKey = "mySecretKey123";
        public string ComputeSha1Hash(HashDto obj)
        {
            var json = Newtonsoft.Json.JsonConvert.SerializeObject(obj);
            var bytes = Encoding.UTF8.GetBytes(json);

            using (var hmac = new HMACSHA1(Encoding.UTF8.GetBytes(secretKey)))
            {
                var hash = hmac.ComputeHash(bytes);
                return Convert.ToBase64String(hash);
            }
        }

    }
}
