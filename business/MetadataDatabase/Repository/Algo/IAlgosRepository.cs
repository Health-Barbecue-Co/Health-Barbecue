using MetadataDatabase.framework.DAL;
using MetadataDatabase.Models;
using MongoDB.Bson;

namespace MetadataDatabase.Repository
{
    /// <summary>
    /// Algo Repository interface.
    /// </summary>
    /// <seealso cref="MetadataDatabase.framework.DAL.IRepository{MetadataDatabase.Models.Algo, MongoDB.Bson.ObjectId}" />
    public interface IAlgosRepository: IRepository<Algo, ObjectId> {}
}
