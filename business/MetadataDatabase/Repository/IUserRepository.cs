using MetadataDatabase.framework.DAL;
using MetadataDatabase.Models;
using MongoDB.Bson;

namespace MetadataDatabase.Repository
{
    /// <summary>
    /// User Repository interface.
    /// </summary>
    public interface IUserRepository: IRepository<User, ObjectId> {}
}
