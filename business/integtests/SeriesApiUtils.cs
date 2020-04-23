using Newtonsoft.Json;
using RestSharp;
using System.Collections.Generic;

namespace IntegTests
{
    public class SeriesApiUtils
    {
        #region Test attributes
        public readonly RestClient Client;
        private readonly RestRequest getSeriesRequest;
        #endregion

        #region Test util methods

        public SeriesApiUtils()
        {
            this.Client = new RestClient("http://localhost:5000");
            this.getSeriesRequest = new RestRequest("/api/Series", DataFormat.Json);
        }

        public HBSeriesDto createSeries(HBSeriesDto series)
        {
            var postSeriesRequest = new RestRequest("/api/Series", DataFormat.Json);
            string json = series.toJson();
            postSeriesRequest.AddJsonBody(json);

            var response = Client.Post(postSeriesRequest);
            return JsonConvert.DeserializeObject<HBSeriesDto>(response.Content);
        }

        public HBSeriesDto createSeries(string seriesInstanceUID)
        {
            return createSeries(new HBSeriesDto { SeriesInstanceUID = seriesInstanceUID });
        }

        public IRestResponse getAllSeriesResponse()
        {
            return Client.Get(getSeriesRequest);
        }

        public List<HBSeriesDto> getAllSeries()
        {
            var response = Client.Get(getSeriesRequest);
            string responseString = response.Content;
            List<HBSeriesDto> seriesList = JsonConvert.DeserializeObject<List<HBSeriesDto>>(responseString);
            return seriesList;
        }

        public HBSeriesDto getSeriesId(string id)
        {
            // Get the series by Id
            var getSeriesIdRequest = new RestRequest("/api/Series/" + id, DataFormat.Json);
            var responseGet = Client.Get(getSeriesIdRequest);
            return JsonConvert.DeserializeObject<HBSeriesDto>(responseGet.Content);
        }

        public void deleteAllSeries()
        {
            var response = Client.Get(getSeriesRequest);
            string responseString = response.Content;
            List<HBSeriesDto> seriesList = JsonConvert.DeserializeObject<List<HBSeriesDto>>(responseString);

            foreach (var series in seriesList)
            {
                var deleteSeriesRequest = new RestRequest("/api/Series/" + series.Id, DataFormat.Json);
                response = Client.Delete(deleteSeriesRequest);
            }
        }
        #endregion
    }
}
