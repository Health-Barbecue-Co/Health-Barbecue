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
            // First call to PacsMirror : cannot test the series returned since the integ test doesn't control the Pacs yet.
            RestRequest getPacsMirrorRequest = new RestRequest("/api/PacsMirror", DataFormat.Json);
            var responseGet = seriesClient.Client.Get(getPacsMirrorRequest);
            Assert.Equal(HttpStatusCode.OK, responseGet.StatusCode);
            List<HBSeriesDto> listSeriesInPacs = seriesClient.getAllSeries();
            int nbSeriesInPacs = listSeriesInPacs.Count;

            // Add series
            HBSeriesDto seriesPosted1 = seriesClient.createSeries("TestGetSeries1");
            HBSeriesDto seriesPosted2 = seriesClient.createSeries("TestGetSeries2");

            List<HBSeriesDto> seriesList = seriesClient.getAllSeries();
            // Pre-check
            Assert.Equal(2+ nbSeriesInPacs, seriesList.Count);

            // Act
            var responseGetMirror = seriesClient.Client.Get(getPacsMirrorRequest);
            Assert.Equal(HttpStatusCode.OK, responseGetMirror.StatusCode);

            List<HBSeriesDto> listSeriesPacsOnly = seriesClient.getAllSeries();
            Assert.Equal(nbSeriesInPacs, listSeriesPacsOnly.Count);
            foreach (var seriesInPacs in listSeriesPacsOnly)
            {
                Assert.NotEqual(seriesPosted1, seriesInPacs);
                Assert.NotEqual(seriesPosted2, seriesInPacs);
            }
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
