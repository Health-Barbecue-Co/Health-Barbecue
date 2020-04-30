using MetadataDatabase.framework.DAL;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MetadataDatabase.Models
{
    public class Label : IMongoEntity
    {
        public ObjectId Id { get; set; }
        public string User { get; set; }
        public string LabelKey { get; set; }
        public string LabelType { get; set; }
        public string[] LabelValue { get; set; }
        public bool IsPublic { get; set; }
        public bool IsApproved { get; set; }
        public string AssignedValue { get; set; }
    }
}
