using MetadataDatabase.Controllers;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MetadataDatabase.Services
{
    public interface IPacsService
    {
        public Task<IEnumerable<QidoSeries>> GetSeriesAsync();
    }
}
