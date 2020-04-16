namespace MetadataDatabase.framework.DAL
{
    /// <summary>Configuration file for MongoDB.</summary>
    public class MongoConfiguration
    {
        /// <summary>
        ///   <p>Gets or sets the server name.</p>
        ///   <p>example : localhost</p>
        /// </summary>
        /// <value>The Server name .</value>
        public string Servername { get; set; }

        /// <summary>
        ///   <p>Gets or sets the port of server.</p>
        ///   <p>example : 27017</p>
        /// </summary>
        /// <value>The Server's port.</value>
        public string Port { get; set; }

        /// <summary>
        /// Gets the name of the database.
        /// </summary>
        /// <value>The name of the database.</value>
        public string DatabaseName { get; set; }
    }
}