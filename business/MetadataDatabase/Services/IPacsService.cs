using MetadataDatabase.Controllers;
using MetadataDatabase.Data;
using System.Collections.Generic;

namespace MetadataDatabase.Services
{
    public interface IPacsService
    {
        public IEnumerable<SeriesDto> GetSeriesList();
        public SeriesDto GetMetadataSeries(SeriesDto series);
    }
}
