using MetadataDatabase.Controllers;
using MetadataDatabase.Models;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

namespace MetadataDatabase.Services
{
    public class PacsServices: IPacsServices
    {
        private static readonly HttpClient client = new HttpClient();
        private readonly PacsConfiguration settings;

        public PacsServices(IOptions<PacsConfiguration> settings)
        {
            this.settings = settings.Value;
        }

        public async Task<IEnumerable<QidoSeries>> GetSeries()
        {
            var streamtask = client.GetStreamAsync($"http://{this.settings.Host}:{this.settings.Port}/{this.settings.Path}/series");
            var orthancSeriesList = await JsonSerializer.DeserializeAsync<IEnumerable<QidoSeries>>(await streamtask);
            return orthancSeriesList;
        }
    }
}
