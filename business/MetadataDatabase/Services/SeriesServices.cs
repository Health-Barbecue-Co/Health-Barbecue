using System.Collections.Generic;
using MetadataDatabase.Repository;
using MetadataDatabase.Data;
using MetadataDatabase.Convertor;
using MetadataDatabase.framework.DAL;
using MongoDB.Bson;

namespace MetadataDatabase.Services
{
    public class SeriesServices : ISeriesServices
    {
        private readonly ISeriesRepository seriesRepository;

        /// <summary>
        /// Initializes a new instance of the <see cref="SeriesServices"/> class.
        /// </summary>
        /// <param name="seriesRepository">The series repository.</param>
        public SeriesServices(ISeriesRepository seriesRepository)
        {
            this.seriesRepository = seriesRepository;
        }

        /// <summary>
        /// Creates the provided series.
        /// </summary>
        /// <param name="objectToCreate">The series to create.</param>
        /// <returns></returns>
        public SeriesDto Create(SeriesDto objectToCreate)
        {
            return this.seriesRepository.Create(objectToCreate.ToModel()).ToDto();
        }

        /// <summary>
        /// Deletes the specified series.
        /// </summary>
        /// <param name="id">The identifier.</param>
        public void Delete(string id)
        {
            this.seriesRepository.Delete(id.ToObjectId());
        }

        /// <summary>
        /// Gets the series by the specified identifier.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns></returns>
        public SeriesDto Get(string id)
        {
            return this.seriesRepository.Get(id.ToObjectId())?.ToDto();
        }

        /// <summary>
        /// Gets all the series.
        /// </summary>
        /// <returns></returns>
        public IEnumerable<SeriesDto> GetAll()
        {
            return this.seriesRepository.GetAll()?.ToDto();
        }

        /// <summary>
        /// Updates the specified series.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <param name="objectToUpdate">The series to update.</param>
        public void Update(string id, SeriesDto objectToUpdate)
        {
            objectToUpdate.Id = id;
            this.seriesRepository.Update(objectToUpdate.ToModel());
        }
    }
}