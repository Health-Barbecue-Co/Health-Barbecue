using MetadataDatabase.Data;
using System.Collections.Generic;

namespace MetadataDatabase.Services
{
    public interface ISeriesServices
    {
        IEnumerable<SeriesDto> GetAll();
    }
}