namespace MetadataDatabase.framework.DAL
{
    /// <summary>Configuration file for MongoDB.</summary>
    public class MongoConfiguration
    {
        /// <summary>
        ///   <p>Gets or sets the URL.</p>
        ///   <p>example : mongodb://localhost:27017</p>
        /// </summary>
        /// <value>The URL.</value>
        public string Url { get; set; }

        /// <summary>
        /// Gets the name of the database.
        /// </summary>
        /// <value>The name of the database.</value>
        public string DatabaseName { get; set; }
    }
}