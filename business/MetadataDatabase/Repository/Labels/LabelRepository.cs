using MetadataDatabase.Data;
using MetadataDatabase.Models;
using MetadataDatabase.framework.DAL;
using Microsoft.Extensions.Options;

namespace MetadataDatabase.Repository
{

    public class LabelRepository : MongoRepositoryBase<Label>, ILabelRepository
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="LabelRepository"/> class.
        /// </summary>
        /// <param name="configuration">The configuration.</param>
        public LabelRepository(IOptions<MongoConfiguration> configuration) : base(configuration.Value) { }
    }
}
