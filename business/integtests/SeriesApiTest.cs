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
            HBSeriesDto seriesPosted1 = createSeries("TestGetSeries1");
            HBSeriesDto seriesPosted2 = createSeries("TestGetSeries2");

            var response = client.Get(getSeriesRequest);
            string responseString = response.Content;
            List<HBSeriesDto> seriesList = JsonConvert.DeserializeObject<List<HBSeriesDto>>(responseString);

            Assert.Equal(2, seriesList.Count);
            Assert.Equal(seriesPosted1, seriesList[0]);
            Assert.Equal(seriesPosted2, seriesList[1]);
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
            HBSeriesDto seriesPosted = createSeries("TestGetSeriesId");

            var getSeriesIdRequest = new RestRequest("/api/Series/" + seriesPosted.Id, DataFormat.Json);
            var responseGet = client.Get(getSeriesIdRequest);
            Assert.Equal(HttpStatusCode.OK, responseGet.StatusCode);
            HBSeriesDto seriesGet = JsonConvert.DeserializeObject<HBSeriesDto>(responseGet.Content);

            Assert.Equal(seriesPosted, seriesGet);
        }

        [Fact]
        public void GetSeriesWrongId()
        {
            var getSeriesIdRequest = new RestRequest("/api/Series/" + "toto", DataFormat.Json);
            var responseGet = client.Get(getSeriesIdRequest);
            Assert.Equal(HttpStatusCode.NoContent, responseGet.StatusCode);
        }

        [Fact]
        public void PutSeriesId()
        {
            // Create a new series and post it
            HBSeriesDto seriesPosted = createSeries(new HBSeriesDto
            {
                SeriesInstanceUID = "TestPutSeriesId",
                SpecificCharacterSet = "att2",
                StudyDate = "att2",
                StudyTime = "att2",
                AccessionNumber = "att2",
                Modality = "att2",
                ReferringPhysiciansName = "att2",
                SeriesDescription = "att2",
                RetrieveURLAttribute = "att2",
                PatientsName = "att2",
                PatientID = "att2",
                PatientsBirthDate = "att2",
                PatientsSex = "att2",
                StudyInstanceUID = "att2",
                SeriesNumber = "att2",
                NumberOfSeriesRelatedInstances = "att2"
            });

            // Create a series with the same Id, but different values
            HBSeriesDto seriesPut = new HBSeriesDto
            {
                Id = seriesPosted.Id,
                SeriesInstanceUID = "TestPutSeriesIdModified",
                SpecificCharacterSet = "att3",
                StudyDate = "att3",
                StudyTime = "att3",
                AccessionNumber = "att3",
                Modality = "att3",
                ReferringPhysiciansName = "att3",
                SeriesDescription = "att3",
                RetrieveURLAttribute = "att3",
                PatientsName = "att3",
                PatientID = "att3",
                PatientsBirthDate = "att3",
                PatientsSex = "att3",
                StudyInstanceUID = "att3",
                SeriesNumber = "att3",
                NumberOfSeriesRelatedInstances = "att3"
            };

            // Put the modified series
            var putSeriesIdRequest = new RestRequest("/api/Series/" + seriesPosted.Id, DataFormat.Json);
            putSeriesIdRequest.AddJsonBody(seriesPut.toJson());
            var responsePut = client.Put(putSeriesIdRequest);
            Assert.Equal(HttpStatusCode.NoContent, responsePut.StatusCode);

            // Get the series by Id
            HBSeriesDto seriesGet = getSeriesId(seriesPosted.Id);

            // Assert the series
            Assert.Equal(seriesPut, seriesGet);
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
            HBSeriesDto series = createSeries("TestDeleteSeries");

            var deleteSeriesRequest = new RestRequest("/api/Series/" + series.Id, DataFormat.Json);
            var response = client.Delete(deleteSeriesRequest);
            Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);

            // The series should be removed
            Assert.Null(getSeriesId(series.Id));
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

        private HBSeriesDto createSeries(HBSeriesDto series)
        {
            var postSeriesRequest = new RestRequest("/api/Series", DataFormat.Json);
            string json = series.toJson();
            postSeriesRequest.AddJsonBody(json);

            var response = client.Post(postSeriesRequest);
            return JsonConvert.DeserializeObject<HBSeriesDto>(response.Content);
        }

        private HBSeriesDto createSeries(string seriesInstanceUID)
        {
            return createSeries(new HBSeriesDto { SeriesInstanceUID = seriesInstanceUID });
        }

        private HBSeriesDto getSeriesId(string id)
        {
            // Get the series by Id
            var getSeriesIdRequest = new RestRequest("/api/Series/" + id, DataFormat.Json);
            var responseGet = client.Get(getSeriesIdRequest);
            return JsonConvert.DeserializeObject<HBSeriesDto>(responseGet.Content);
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
