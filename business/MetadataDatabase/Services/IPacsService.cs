using MetadataDatabase.Controllers;
using MetadataDatabase.Data;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MetadataDatabase.Services
{
    public interface IPacsService
    {
        public Task<IEnumerable<QidoSeries>> GetSeriesListAsync();
        public Task<QidoSeries> GetMetadataSeriesAsync(string studiesUid, string seriesUid);
    }
}
