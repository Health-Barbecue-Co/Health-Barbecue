using MetadataDatabase.framework.DAL;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MetadataDatabase.Models
{
    public class Algo : IMongoEntity
    {
        public ObjectId Id { get; set; }
        public string User { get; set; }
        public string Name { get; set; }
        public string MainFile { get; set; }
        public string ContentFile { get; set; }
        public string Description { get; set; }

    }
}
