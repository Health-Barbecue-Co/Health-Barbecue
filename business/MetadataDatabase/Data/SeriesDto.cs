using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MetadataDatabase.Data
{
    public class SeriesDto
    {
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
