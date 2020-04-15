using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace MetadataDatabase.framework.DAL
{
    /// <summary>
    /// BAse class for the mongo repository.
    /// </summary>
    /// <typeparam name="TMongoEntity">The type of the mongo entity.</typeparam>
    /// <seealso cref="MetadataDatabase.framework.DAL.IRepository{TMongoEntity, MongoDB.Bson.ObjectId}" />
    public abstract class MongoRepositoryBase<TMongoEntity> : IRepository<TMongoEntity, ObjectId> where TMongoEntity : IMongoEntity, new()
    {
        /// <summary>The mongo client</summary>
        private readonly MongoClient MongoClient;

        /// <summary>The database name</summary>
        private readonly string databaseName;

        /// <summary>Gets the collection for the entity.</summary>
        /// <value>The collection.</value>
        protected IMongoCollection<TMongoEntity> Collection
        {
            get { return MongoClient.GetDatabase(databaseName).GetCollection<TMongoEntity>(typeof(TMongoEntity).Name); }
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="MongoRepositoryBase{TMongoEntity}"/> class.
        /// </summary>
        /// <param name="configuration">The configuration.</param>
        /// <exception cref="ArgumentNullException">
        /// Url
        /// or
        /// DatabaseName
        /// </exception>
        public MongoRepositoryBase(MongoConfiguration configuration)
        {
            // sanity check
            if (string.IsNullOrWhiteSpace(configuration.Url))
            {
                throw new ArgumentNullException(nameof(configuration.Url));
            }

            if (string.IsNullOrWhiteSpace(configuration.DatabaseName))
            {
                throw new ArgumentNullException(nameof(configuration.DatabaseName));
            }

            // create the settings
            var settings = MongoClientSettings.FromUrl(MongoUrl.Create(configuration.Url));

            // create the Mongo DB client.
            try
            {
                MongoClient = new MongoClient(settings);
            }
            catch (Exception ex)
            {
                Debug.WriteLine($"error durring mongo DB initialisation : {configuration.Url} \ntrace -----> {ex.Message}");
            }

            databaseName = configuration.DatabaseName;
        }

        /// <summary>
        ///   <para>
        ///  Creates an instance of TEntity.</para>
        /// </summary>
        /// <param name="entity">The entity to create.</param>
        /// <returns>A new TEntity.</returns>
        public TMongoEntity Create(TMongoEntity entity)
        {
            entity.Id = ObjectId.GenerateNewId();
            Collection.InsertOne(entity);
            return entity;
        }

        /// <summary>Deletes the specified identifier.</summary>
        /// <param name="id">The identifier.</param>
        public void Delete(ObjectId id)
        {
            Collection.DeleteOne(x => x.Id.Equals(id));
        }

        /// <summary>Gets the TEntity by specification.</summary>
        /// <param name="id">The ID.</param>
        /// <returns>The list of TEntity matching the query</returns>
        public TMongoEntity Get(ObjectId id)
        {
            return Collection.Find(entity => id.Equals(entity.Id))
                .SingleOrDefault();// throws an error if we fin more than 1 document matching the ID.
        }

        /// <summary>Gets all TEntity.</summary>
        /// <returns>All TEntity.</returns>
        public IEnumerable<TMongoEntity> GetAll()
        {
            return Collection.Find(new BsonDocument()).ToList();
        }

        /// <summary>
        /// Gets the TEntity by specification.
        /// </summary>
        /// <param name="query">The query.</param>
        /// <returns>
        /// The list of TEntity matching the query
        /// </returns>
        public IEnumerable<TMongoEntity> GetBySpecification(Expression<Func<TMongoEntity, bool>> query)
        {
            return Collection.Find(query).ToList();
        }

        /// <summary>Updates the specified entity.</summary>
        /// <param name="entity">The entity.</param>
        public void Update(TMongoEntity entity)
        {
            Collection.ReplaceOne(x => x.Id.Equals(entity.Id), entity);
        }


    }
}
