using MetadataDatabase.framework.DAL;
using MetadataDatabase.Models;
using MongoDB.Bson;

namespace MetadataDatabase.Repository
{
    /// <summary>
    /// Label Repository interface.
    /// </summary>
    /// <seealso cref="MetadataDatabase.framework.DAL.IRepository{MetadataDatabase.Models.Label, MongoDB.Bson.ObjectId}" />
    public interface ILabelRepository: IRepository<Label, ObjectId> {}
}
