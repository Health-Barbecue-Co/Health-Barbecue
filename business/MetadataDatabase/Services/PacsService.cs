using MetadataDatabase.Controllers;
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

        public async Task<IEnumerable<QidoSeries>> GetSeriesListAsync()
        {
            var streamtask = client.GetStreamAsync($"http://{this.settings.Host}:{this.settings.Port}/{this.settings.Path}/series");
            var pacsSeriesList = await JsonSerializer.DeserializeAsync<IEnumerable<QidoSeries>>(await streamtask);
            return pacsSeriesList;
        }

        public async Task<QidoSeries> GetMetadataSeriesAsync(string studiesUid, string seriesUid)
        {
            var streamtask = client.GetStreamAsync(
                $"http://{this.settings.Host}:{this.settings.Port}/{this.settings.Path}/studies/{studiesUid}/series/{seriesUid}/metadata");
            var seriesMetadata = await JsonSerializer.DeserializeAsync<IEnumerable<QidoSeries>>(await streamtask);
            return seriesMetadata.FirstOrDefault();
        }
    }
}
