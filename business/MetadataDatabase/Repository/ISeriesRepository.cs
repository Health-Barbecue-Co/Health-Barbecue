using MetadataDatabase.framework.DAL;
using MetadataDatabase.Models;
using MongoDB.Bson;

namespace MetadataDatabase.Repository
{
    /// <summary>
    /// Series Repository interface.
    /// </summary>
    public interface ISeriesRepository: IRepository<Series, ObjectId> {}
}
