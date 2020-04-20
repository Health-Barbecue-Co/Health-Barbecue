using System;
using System.Net;
using Xunit;
using RestSharp;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Threading;

namespace IntegTests
{
    public class BusinessApiTest : IDisposable
    {
        private RestClient client = new RestClient("http://localhost:5000");
        private RestRequest getSeriesRequest = new RestRequest("/api/Series", DataFormat.Json);

        [Fact]
        public void GetSeries()
        {
            var response = client.Get(getSeriesRequest);
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }
        
        [Fact]
        public void PostSeries()
        {
            var postSeriesRequest = new RestRequest("/api/Series", DataFormat.Json);
            postSeriesRequest.AddJsonBody(new { SeriesInstanceUID="TestPostSeries" });

            var response = client.Post(postSeriesRequest);
            Assert.Equal(HttpStatusCode.Created, response.StatusCode);
            string newId = response.Content;

            var getSeriesRequest = new RestRequest("/api/Series", DataFormat.Json);
            response = client.Get(getSeriesRequest);
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);

            string responseString = response.Content;
            Assert.Contains(newId, responseString);
        }

        [Fact]
        public void DeleteSeries()
        {
            var postSeriesRequest = new RestRequest("/api/Series", DataFormat.Json);
            postSeriesRequest.AddJsonBody(new { SeriesInstanceUID = "TestDeleteSeries" });

            var response = client.Post(postSeriesRequest);
            Assert.Equal(HttpStatusCode.Created, response.StatusCode);
            HBSeries series = JsonConvert.DeserializeObject<HBSeries>(response.Content);

            var deleteSeriesTotoRequest = new RestRequest("/api/Series/" + "Toto", DataFormat.Json);
            response = client.Delete(deleteSeriesTotoRequest);
            Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);

            var deleteSeriesRequest = new RestRequest("/api/Series/" + series.Id, DataFormat.Json);
            response = client.Delete(deleteSeriesRequest);
            Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);

        }
 
        private void deleteAllSeries()
        {
            var response = client.Get(getSeriesRequest);
            string responseString = response.Content;
            List<HBSeries> seriesList = JsonConvert.DeserializeObject<List<HBSeries>>(responseString);

            foreach (var series in seriesList)
            {
                var deleteSeriesRequest = new RestRequest("/api/Series/" + series.Id, DataFormat.Json);
                response = client.Delete(deleteSeriesRequest);
            }
        }

        public void Dispose()
        {
            deleteAllSeries();
        }

    }
}
