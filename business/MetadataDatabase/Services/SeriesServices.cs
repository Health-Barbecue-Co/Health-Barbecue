using MetadataDatabase.Data;
using MetadataDatabase.Repository;
using System.Collections.Generic;

namespace MetadataDatabase.Services
{
    public class SeriesServices : ISeriesServices
    {
        private readonly ISeriesRepository seriesRepository;

        public SeriesServices(ISeriesRepository seriesRepository)
        {
            this.seriesRepository = seriesRepository;
        }

        public IEnumerable<SeriesDto> GetAll()
        {
            return this.seriesRepository.GetAll();
        }
    }
}