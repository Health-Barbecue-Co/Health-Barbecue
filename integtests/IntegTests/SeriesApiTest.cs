using System;
using System.Net;
using Xunit;
using RestSharp;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Threading;

namespace IntegTests
{
    public class SeriesApiTest : IDisposable
    {
        #region Integration tests
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

            var responsePost = client.Post(postSeriesRequest);
            Assert.Equal(HttpStatusCode.Created, responsePost.StatusCode);
            string newId = responsePost.Content;

            var getSeriesRequest = new RestRequest("/api/Series", DataFormat.Json);
            var responseGet = client.Get(getSeriesRequest);

            Assert.Equal(HttpStatusCode.OK, responseGet.StatusCode);
            Assert.Contains(newId, responseGet.Content);
        }

        [Fact]
        public void GetSeriesId()
        {
            HBSeries seriesPosted = CreateSeries("TestGetSeriesId");

            var getSeriesIdRequest = new RestRequest("/api/Series/" + seriesPosted.Id, DataFormat.Json);
            var responseGet = client.Get(getSeriesIdRequest);
            Assert.Equal(HttpStatusCode.OK, responseGet.StatusCode);
            HBSeries seriesGet = JsonConvert.DeserializeObject<HBSeries>(responseGet.Content);

            Assert.Equal(seriesPosted.Id, seriesGet.Id);
            Assert.Equal(seriesPosted.SeriesInstanceUID, seriesGet.SeriesInstanceUID);
        }

        [Fact]
        public void GetSeriesWrongId()
        {
            var getSeriesIdRequest = new RestRequest("/api/Series/" + "toto", DataFormat.Json);
            var responseGet = client.Get(getSeriesIdRequest);
            Assert.Equal(HttpStatusCode.NotFound, responseGet.StatusCode);
        }

        [Fact]
        public void PutSeriesId()
        {
            HBSeries seriesPosted = CreateSeries("TestPutSeriesId");

            var putSeriesIdRequest = new RestRequest("/api/Series/" + seriesPosted.Id, DataFormat.Json);
            putSeriesIdRequest.AddJsonBody(new { SeriesInstanceUID = "TestPutSeriesIdModified" });
            var responsePut = client.Put(putSeriesIdRequest);
            Assert.Equal(HttpStatusCode.NoContent, responsePut.StatusCode);

            var getSeriesIdRequest = new RestRequest("/api/Series/" + seriesPosted.Id, DataFormat.Json);
            var responseGet = client.Get(getSeriesIdRequest);
            Assert.Equal(HttpStatusCode.OK, responseGet.StatusCode);
            HBSeries seriesGet = JsonConvert.DeserializeObject<HBSeries>(responseGet.Content);

            Assert.Equal(seriesPosted.Id, seriesGet.Id);
            Assert.Equal("TestPutSeriesIdModified", seriesGet.SeriesInstanceUID);
        }

        [Fact]
        public void PutSeriesWrongId()
        {
            var putSeriesIdRequest = new RestRequest("/api/Series/" + "toto", DataFormat.Json);
            putSeriesIdRequest.AddJsonBody(new { SeriesInstanceUID = "TestPutSeriesIdModified" });
            var responsePut = client.Put(putSeriesIdRequest);
            Assert.Equal(HttpStatusCode.NotFound, responsePut.StatusCode);
        }

        [Fact]
        public void DeleteSeriesId()
        {
            HBSeries series = CreateSeries("TestDeleteSeries");

            var deleteSeriesRequest = new RestRequest("/api/Series/" + series.Id, DataFormat.Json);
            var response = client.Delete(deleteSeriesRequest);
            Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
        }

        public SeriesApiTest()
        {
            this.client = new RestClient("http://localhost:5000");
            this.getSeriesRequest = new RestRequest("/api/Series", DataFormat.Json);
        }

        [Fact]
        public void DeleteSeriesWrongId()
        {
            var deleteSeriesTotoRequest = new RestRequest("/api/Series/" + "Toto", DataFormat.Json);
            var response = client.Delete(deleteSeriesTotoRequest);
            Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        }
        #endregion

        #region Test attributes
        private readonly RestClient client;
        private readonly RestRequest getSeriesRequest;
        #endregion

        #region Test util methods
        private HBSeries CreateSeries(string seriesInstanceUID)
        {
            var postSeriesRequest = new RestRequest("/api/Series", DataFormat.Json);
            postSeriesRequest.AddJsonBody(new { SeriesInstanceUID = seriesInstanceUID });

            var response = client.Post(postSeriesRequest);
            return JsonConvert.DeserializeObject<HBSeries>(response.Content);
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
        #endregion
    }
}
