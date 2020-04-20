using MetadataDatabase.framework.DAL;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MetadataDatabase.Models
{
    public class User : IMongoEntity
    {
        /// <summary>
        /// Gets or sets the identifier.
        /// </summary>
        /// <value>
        /// The identifier.
        /// </value>
        public ObjectId Id { get; set; }


        /// <summary>
        /// Gets or sets the user instance lastname.
        /// </summary>
        /// <value>
        /// The user instance lastname.
        /// </value>
        public string lastname { get; set; }

        /// <summary>
        /// Gets or sets the user instance firstname.
        /// </summary>
        /// <value>
        /// The user instance firstname.
        /// </value>
        public string firstname { get; set; }

        /// <summary>
        /// Gets or sets the user instance login.
        /// </summary>
        /// <value>
        /// The user instance login.
        /// </value>
        public string login { get; set; }

        /// <summary>
        /// Gets or sets the user instance role.
        /// </summary>
        /// <value>
        /// The user instance role.
        /// </value>
        public string role { get; set; }
    }
}