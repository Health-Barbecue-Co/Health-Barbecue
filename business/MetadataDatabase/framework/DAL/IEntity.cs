namespace MetadataDatabase.framework.DAL
{
    /// <summary>
    /// The entity interface.
    /// </summary>
    /// <typeparam name="TId">The type of the identifier.</typeparam>
    public interface IEntity<TId>
    {
        /// <summary>
        /// Gets or sets the identifier.
        /// </summary>
        /// <value>
        /// The identifier.
        /// </value>
        TId Id { get; set; }
    }
}