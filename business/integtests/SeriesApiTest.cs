using Newtonsoft.Json;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Net;
using Xunit;

namespace IntegTests
{
    public class SeriesApiTest : IDisposable
    {
        #region Integration tests

        [Fact]
        public void GetSeries()
        {
            HBSeriesDto seriesPosted1 = CreateSeries("TestGetSeries1");
            HBSeriesDto seriesPosted2 = CreateSeries("TestGetSeries2");

            var response = client.Get(getSeriesRequest);
            string responseString = response.Content;
            List<HBSeriesDto> seriesList = JsonConvert.DeserializeObject<List<HBSeriesDto>>(responseString);

            Assert.Equal(2, seriesList.Count);
            Assert.Equal(seriesPosted1.Id, seriesList[0].Id);
            Assert.Equal(seriesPosted1.SeriesInstanceUID, seriesList[0].SeriesInstanceUID);
            Assert.Equal(seriesPosted2.Id, seriesList[1].Id);
            Assert.Equal(seriesPosted2.SeriesInstanceUID, seriesList[1].SeriesInstanceUID);
        }

        [Fact]
        public void GetSeriesEmpty()
        {
            var responseEmpty = client.Get(getSeriesRequest);
            Assert.Equal(HttpStatusCode.OK, responseEmpty.StatusCode);
            List<HBSeriesDto> seriesList = JsonConvert.DeserializeObject<List<HBSeriesDto>>(responseEmpty.Content);
            Assert.Empty(seriesList);
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
            HBSeriesDto seriesPosted = CreateSeries("TestGetSeriesId");

            var getSeriesIdRequest = new RestRequest("/api/Series/" + seriesPosted.Id, DataFormat.Json);
            var responseGet = client.Get(getSeriesIdRequest);
            Assert.Equal(HttpStatusCode.OK, responseGet.StatusCode);
            HBSeriesDto seriesGet = JsonConvert.DeserializeObject<HBSeriesDto>(responseGet.Content);

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
            HBSeriesDto seriesPosted = CreateSeries("TestPutSeriesId");

            var putSeriesIdRequest = new RestRequest("/api/Series/" + seriesPosted.Id, DataFormat.Json);
            putSeriesIdRequest.AddJsonBody(new { SeriesInstanceUID = "TestPutSeriesIdModified" });
            var responsePut = client.Put(putSeriesIdRequest);
            Assert.Equal(HttpStatusCode.NoContent, responsePut.StatusCode);

            var getSeriesIdRequest = new RestRequest("/api/Series/" + seriesPosted.Id, DataFormat.Json);
            var responseGet = client.Get(getSeriesIdRequest);
            Assert.Equal(HttpStatusCode.OK, responseGet.StatusCode);
            HBSeriesDto seriesGet = JsonConvert.DeserializeObject<HBSeriesDto>(responseGet.Content);

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
            HBSeriesDto series = CreateSeries("TestDeleteSeries");

            var deleteSeriesRequest = new RestRequest("/api/Series/" + series.Id, DataFormat.Json);
            var response = client.Delete(deleteSeriesRequest);
            Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
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

        public SeriesApiTest()
        {
            this.client = new RestClient("http://localhost:5000");
            this.getSeriesRequest = new RestRequest("/api/Series", DataFormat.Json);
        }

        private HBSeriesDto CreateSeries(string seriesInstanceUID)
        {
            var postSeriesRequest = new RestRequest("/api/Series", DataFormat.Json);
            postSeriesRequest.AddJsonBody(new { SeriesInstanceUID = seriesInstanceUID });

            var response = client.Post(postSeriesRequest);
            return JsonConvert.DeserializeObject<HBSeriesDto>(response.Content);
        }

        private void deleteAllSeries()
        {
            var response = client.Get(getSeriesRequest);
            string responseString = response.Content;
            List<HBSeriesDto> seriesList = JsonConvert.DeserializeObject<List<HBSeriesDto>>(responseString);

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
