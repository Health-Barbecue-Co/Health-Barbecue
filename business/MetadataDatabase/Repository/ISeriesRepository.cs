using MetadataDatabase.Data;
using System.Collections.Generic;

namespace MetadataDatabase.Repository
{
    public interface ISeriesRepository
    {
        IEnumerable<SeriesDto> GetAll();
    }
}