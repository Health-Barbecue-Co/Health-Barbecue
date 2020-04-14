using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MetadataDatabase.Models
{
    public class Series
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("SeriesInstanceUID")]
        public string Uid { get; set; }
    }
}