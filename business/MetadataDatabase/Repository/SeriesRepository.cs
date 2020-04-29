using MetadataDatabase.Models;
using MetadataDatabase.framework.DAL;
using Microsoft.Extensions.Options;

namespace MetadataDatabase.Repository
{

    public class SeriesRepository : MongoRepositoryBase<Series>, ISeriesRepository
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="SeriesRepository"/> class.
        /// </summary>
        /// <param name="configuration">The configuration.</param>
        public SeriesRepository(IOptions<MongoConfiguration> configuration) : base(configuration.Value)
        {

        }
    }
}
