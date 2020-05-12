using MetadataDatabase.framework.DAL;
using MetadataDatabase.Models;
using MongoDB.Bson;

namespace MetadataDatabase.Repository
{
    /// <summary>
    /// Label Repository interface.
    /// </summary>
    public interface ILabelRepository: IRepository<Label, ObjectId> {}
}
