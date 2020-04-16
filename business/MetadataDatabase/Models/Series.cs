using MetadataDatabase.framework.DAL;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MetadataDatabase.Models
{
    public class Series : IMongoEntity
    {
        /// <summary>
        /// Gets or sets the identifier.
        /// </summary>
        /// <value>
        /// The identifier.
        /// </value>
        public ObjectId Id { get; set; }


        /// <summary>
        /// Gets or sets the series instance uid.
        /// </summary>
        /// <value>
        /// The series instance uid.
        /// </value>
        public string SeriesInstanceUID { get; set; }
    }
}