namespace MetadataDatabase.Models
{
    using MongoDB.Driver;
    using System;

    public class SeriesContext: IModelContext<Series>
    {
        private readonly IMongoDatabase _db;
		public IMongoCollection<Series> Collection { get; set; }

		public SeriesContext(ISeriesDBSettings settings) {
            var client = new MongoClient($@"mongodb://{settings.Host}:{settings.Port}");

            _db = client.GetDatabase(settings.Database);
            Collection = _db.GetCollection<Series>(settings.Collection);
        }
    }
}