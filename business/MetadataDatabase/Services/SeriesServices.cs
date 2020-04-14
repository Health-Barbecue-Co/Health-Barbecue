using MetadataDatabase.Models;
using MetadataDatabase.Repository;
using System.Collections.Generic;
using MetadataDatabase.Services;

namespace MetadataDatabase.Services
{
    public interface ISeriesServices: IService<Series>{ }

    public class SeriesServices : ISeriesServices
    {
        private readonly ISeriesRepository _seriesRepository;

        public SeriesServices(ISeriesRepository seriesRepository)
        {
            _seriesRepository = seriesRepository;
        }

        public IEnumerable<Series> GetAll()
        {
            return _seriesRepository.GetAll();
        }
    }
}