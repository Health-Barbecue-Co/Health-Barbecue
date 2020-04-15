using MongoDB.Driver;
using System;

namespace MetadataDatabase.Models {
	public interface IModelContext<T> {
		public IMongoCollection<T> Collection { get; set; }
	}
}