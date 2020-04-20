using System;
using System.Net;
using Xunit;
using RestSharp;
using RestSharp.Authenticators;

namespace IntegTests
{
    public class BusinessApiTest
    {
        [Fact]
        public void GetSeries()
        {
            var client = new RestClient("http://localhost:5000");
            //client.Authenticator = new HttpBasicAuthenticator("username", "password");

            var request = new RestRequest("/api/Series", DataFormat.Json);

            var response = client.Get(request);

            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }
    }
}
