using MetadataDatabase.framework.DAL;
using MetadataDatabase.Models;
using MongoDB.Bson;

namespace MetadataDatabase.Repository
{
    /// <summary>
    /// Series Repository interface.
    /// </summary>
    /// <seealso cref="MetadataDatabase.framework.DAL.IRepository{MetadataDatabase.Models.Series, MongoDB.Bson.ObjectId}" />
    public interface ISeriesRepository: IRepository<Series, ObjectId> {}
}
