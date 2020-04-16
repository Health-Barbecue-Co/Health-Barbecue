using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MetadataDatabase.Models
{
    public class Series
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string SeriesInstanceUID { get; set; }
        public string SpecificCharacterSet { get; set; }
        public string StudyDate { get; set; }
        public string StudyTime { get; set; }
        public string AccessionNumber { get; set; }
        public string Modality { get; set; }
        public string ReferringPhysiciansName { get; set; }
        public string SeriesDescription { get; set; }
        public string RetrieveURLAttribute { get; set; }
        public string PatientsName { get; set; }
        public string PatientID { get; set; }
        public string PatientsBirthDate { get; set; }
        public string PatientsSex { get; set; }
        public string StudyInstanceUID { get; set; }
        public string StudyID { get; set; }
        public string SeriesNumber { get; set; }
        public string NumberOfSeriesRelatedInstances { get; set; }
    }
}