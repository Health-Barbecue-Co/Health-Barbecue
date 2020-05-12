using MetadataDatabase.framework.DAL;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MetadataDatabase.Models
{
    public class UserTheme {
        public int index { get; set; }
        public bool dark { get; set; }
    }
    public class UserSettings {
        public UserTheme theme { set; get; }
    }

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

        /// <summary>
        /// Gets or sets the hash password.
        /// </summary>
        /// <value>
        /// The user hash of password.
        /// </value>
        public byte[] PasswordHash { get; set; }

        /// <summary>
        /// Gets or sets the salt password.
        /// </summary>
        /// <value>
        /// The user salt of password.
        /// </value>
        public byte[] PasswordSalt { get; set; }

        /// <summary>
        /// Gets or sets the settings.
        /// </summary>
        /// <value>
        /// The user settings.
        /// </value>
        public UserSettings settings { get; set; }
    }
}