﻿using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MetadataDatabase.framework.DAL
{
    /// <summary>
    /// Interface for monfgo entity.
    /// </summary>
    public interface IMongoEntity : IEntity<ObjectId>
    {
        /// <summary>Gets or sets the identifier.</summary>
        /// <value>The identifier.</value>
        [BsonRepresentation(BsonType.ObjectId)]
        new ObjectId Id { get; set; }
    }
}