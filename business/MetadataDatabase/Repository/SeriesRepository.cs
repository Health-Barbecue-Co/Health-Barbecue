using MetadataDatabase.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using MongoDB.Driver;
using MetadataDatabase.Models;

namespace MetadataDatabase.Repository
{
    public class SeriesRepository : ISeriesRepository
    {
        private readonly IMongoCollection<Series> _collection;

        public SeriesRepository(SeriesContext ctx) {
            _collection = ctx.Collection;
        }

        /// <summary>
        /// Get all the series;
        /// </summary>
        /// <returns></returns>
        public IEnumerable<Series> GetAll()
        {
            // TODO : Connect to Mongo DB here.
            return _collection.Find(user => true).ToEnumerable();
        }


        public Series Get(string id) {
            return _collection.Find(item => item.Id == id).FirstOrDefault();
        }

        public Series Create(Series entity) {
            _collection.InsertOne(entity);
			return entity;
        }

        // api/[PUT]
        public Series Update(string id, Series entity) {
            _collection.ReplaceOne(item => item.Id == id, entity);
			return Get(id);
        }

        // api/1/[DELETE]
        public bool Delete(string id){
            var result = _collection.DeleteOne(item => item.Id == id);
            return result.DeletedCount == 1;
        }
    }
}
