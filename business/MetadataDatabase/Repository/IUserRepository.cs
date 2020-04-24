using MetadataDatabase.framework.DAL;
using MetadataDatabase.Models;
using MongoDB.Bson;

namespace MetadataDatabase.Repository
{
    /// <summary>
    /// User Repository interface.
    /// </summary>
    /// <seealso cref="MetadataDatabase.framework.DAL.IRepository{MetadataDatabase.Models.User, MongoDB.Bson.ObjectId}" />
    public interface IUserRepository: IRepository<User, ObjectId> {}
}
