using MetadataDatabase.framework.DAL;
using MetadataDatabase.Models;
using MongoDB.Bson;

namespace MetadataDatabase.Repository
{
    /// <summary>
    /// Algo Repository interface.
    /// </summary>
    public interface IAlgosRepository: IRepository<Algo, ObjectId> {}
}
