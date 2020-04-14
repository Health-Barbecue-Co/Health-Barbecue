using System.Collections.Generic;
using MetadataDatabase.Repository;
using MetadataDatabase.Data;
using MetadataDatabase.Convertor;

namespace MetadataDatabase.Services
{
    public class SeriesServices : ISeriesServices
    {
        private readonly ISeriesRepository _seriesRepository;

        public SeriesServices(ISeriesRepository seriesRepository)
        {
            _seriesRepository = seriesRepository;
        }

        public void Create(SeriesDto objectToCreate)
        {
            _seriesRepository.Create(objectToCreate.ToModel());
        }

        public void Delete(string id)
        {
            _seriesRepository.Delete(id);
        }

        public SeriesDto Get(string id)
        {
            return _seriesRepository.Get(id)?.ToDto();
        }

        public IEnumerable<SeriesDto> GetAll()
        {
            return _seriesRepository.GetAll()?.ToDto();
        }

        public void Update(string id, SeriesDto objectToUpdate)
        {
            _seriesRepository.Update(id, objectToUpdate.ToModel());
        }
    }
}