using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace MetadataDatabase.framework.DAL
{
    /// <summary>Manage the CRUD operations for the specified Entity.</summary>
    /// <typeparam name="TEntity">The type of the entity.</typeparam>
    /// <typeparam name="TId">The type of the identifier.</typeparam>
    public interface IRepository<TEntity, TId>
    {
        /// <summary>Creates an instance of TEntity.</summary>
        /// <param name="entity">The entity to create.</param>
        /// <returns>A new TEntity.</returns>
        TEntity Create(TEntity entity);
        
        /// <summary>
        /// Deletes the specified identifier.
        /// </summary>
        /// <param name="id">The identifier.</param>
        void Delete(TId id);

        /// <summary>Gets the TEntity by specification.</summary>
        /// <param name="id">The ID.</param>
        /// <returns>The list of TEntity matching the query</returns>
        TEntity Get(TId id);

        /// <summary>Gets all TEntity.</summary>
        /// <returns>All TEntity.</returns>
        IEnumerable<TEntity> GetAll();

        /// <summary>Gets the TEntity by specification.</summary>
        /// <param name="query">The query.</param>
        /// <returns>The list of TEntity matching the query</returns>
        IEnumerable<TEntity> GetBySpecification(Expression<Func<TEntity, bool>> query);

        /// <summary>
        /// Updates the specified entity.
        /// </summary>
        /// <param name="entity">The entity.</param>
        void Update(TEntity entity);

    }
}
