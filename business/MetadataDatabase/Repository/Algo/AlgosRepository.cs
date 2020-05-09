using MetadataDatabase.Models;
using MetadataDatabase.framework.DAL;
using Microsoft.Extensions.Options;

namespace MetadataDatabase.Repository
{

    public class AlgosRepository : MongoRepositoryBase<Algo>, IAlgosRepository
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="AlgosRepository"/> class.
        /// </summary>
        /// <param name="configuration">The configuration.</param>
        public AlgosRepository(IOptions<MongoConfiguration> configuration) : base(configuration.Value) { }
    }
}
