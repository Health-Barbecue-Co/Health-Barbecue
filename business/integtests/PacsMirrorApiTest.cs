using System;
using System.Collections.Generic;
using System.Text;
using RestSharp;
using System.Net;
using Xunit;

namespace IntegTests
{
    [Collection("Sequential")]
    public class PacsMirrorApiTest : IDisposable
    {
        #region Integration tests
        [Fact]
        public void GetPacsMirror()
        {
            HBSeriesDto seriesPosted1 = seriesClient.createSeries("TestGetSeries1");
            HBSeriesDto seriesPosted2 = seriesClient.createSeries("TestGetSeries2");

            List<HBSeriesDto> seriesList = seriesClient.getAllSeries();
            Assert.Equal(2, seriesList.Count);

            RestRequest getPacsMirrorRequest = new RestRequest("/api/PacsMirror", DataFormat.Json);

            var responsePost = seriesClient.Client.Get(getPacsMirrorRequest);
            Assert.Equal(HttpStatusCode.OK, responsePost.StatusCode);

            List<HBSeriesDto> seriesListEmpty = seriesClient.getAllSeries();
            Assert.Empty(seriesListEmpty);
        }
        #endregion

        #region Test attributes
        private readonly SeriesApiUtils seriesClient;
        #endregion

        #region Test util methods
        public PacsMirrorApiTest()
        {
            this.seriesClient = new SeriesApiUtils();
        }

        public void Dispose()
        {
            seriesClient.deleteAllSeries();
        }
        #endregion
    }
}
