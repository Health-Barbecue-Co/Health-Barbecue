using MetadataDatabase.Controllers;
using MetadataDatabase.Convertor;
using MetadataDatabase.Data;
using MetadataDatabase.Models;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace MetadataDatabase.Services
{
    public class PacsService: IPacsService
    {
        private static readonly HttpClient client = new HttpClient();
        private readonly PacsConfiguration settings;

        public PacsService(IOptions<PacsConfiguration> settings)
        {
            this.settings = settings.Value;
        }

        public IEnumerable<SeriesDto> GetSeriesList()
        {
            Task<IEnumerable<QidoSeries>> task = this.GetSeriesListAsync();
            task.Wait();
            return task.Result?.ToDto();
        }

        public SeriesDto GetMetadataSeries(SeriesDto series)
        {
            Task<QidoSeries> fetchSeriesMetadataTask = this.GetSeriesMetadataAsync(
                series.StudyInstanceUID,
                series.SeriesInstanceUID);
            fetchSeriesMetadataTask.Wait();
            return fetchSeriesMetadataTask.Result?.ToDto();
        }

        private async Task<IEnumerable<QidoSeries>> GetSeriesListAsync()
        {
            var streamtask = client.GetStreamAsync($"http://{this.settings.Host}:{this.settings.Port}/{this.settings.Path}/series");
            var pacsSeriesList = await JsonSerializer.DeserializeAsync<IEnumerable<QidoSeries>>(await streamtask);
            return pacsSeriesList;
        }

        private async Task<QidoSeries> GetSeriesMetadataAsync(string studiesUid, string seriesUid)
        {
            var streamtask = client.GetStreamAsync(
                $"http://{this.settings.Host}:{this.settings.Port}/{this.settings.Path}/studies/{studiesUid}/series/{seriesUid}/metadata");
            var seriesMetadata = await JsonSerializer.DeserializeAsync<IEnumerable<QidoSeries>>(await streamtask);
            return seriesMetadata.FirstOrDefault();
        }
    }
}
