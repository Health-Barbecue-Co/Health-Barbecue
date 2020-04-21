using Newtonsoft.Json;
using RestSharp;
using System;
using System.Net;
using Xunit;

namespace IntegTests
{
    public class VersionApiTest : IDisposable
    {
        #region Integration tests
        [Fact]
        public void GetVersion()
        {
            var responseGet = client.Get(getVersionRequest);
            Assert.Equal(HttpStatusCode.OK, responseGet.StatusCode);
            HBVersion seriesGet = JsonConvert.DeserializeObject<HBVersion>(responseGet.Content);
            Assert.NotNull(seriesGet);
        }

        [Fact]
        public void GetApiVersion()
        {
            var responseGet = client.Get(getApiVersionRequest);
            Assert.Equal(HttpStatusCode.OK, responseGet.StatusCode);
            string apiVersion = responseGet.Content;
            Assert.NotEmpty(apiVersion);
        }
        #endregion

        #region Test attributes
        private readonly RestClient client;
        private readonly RestRequest getVersionRequest;
        private readonly RestRequest getApiVersionRequest;
        #endregion

        #region Test util methods
        public VersionApiTest()
        {
            this.client = new RestClient("http://localhost:5000");
            this.getVersionRequest = new RestRequest("/api/Version", DataFormat.Json);
            this.getApiVersionRequest = new RestRequest("/api/Version/api", DataFormat.Json);
        }

        public void Dispose()
        {
        }
        #endregion
    }
}
