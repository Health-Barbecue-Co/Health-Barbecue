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
        public string BodyPartExamined { get; set; }

        public void Update(SeriesDto seriesDto)
        {
            if (this.SeriesInstanceUID == null) this.SeriesInstanceUID = seriesDto.SeriesInstanceUID;
            if (this.SpecificCharacterSet == null) this.SpecificCharacterSet = seriesDto.SpecificCharacterSet;
            if (this.StudyDate == null) this.StudyDate = seriesDto.StudyDate;
            if (this.StudyTime == null) this.StudyTime = seriesDto.StudyTime;
            if (this.AccessionNumber == null) this.AccessionNumber = seriesDto.AccessionNumber;
            if (this.Modality == null) this.Modality = seriesDto.Modality;
            if (this.ReferringPhysiciansName == null) this.ReferringPhysiciansName = seriesDto.ReferringPhysiciansName;
            if (this.SeriesDescription == null) this.SeriesDescription = seriesDto.SeriesDescription;
            if (this.RetrieveURLAttribute == null) this.RetrieveURLAttribute = seriesDto.RetrieveURLAttribute;
            if (this.PatientsName == null) this.PatientsName = seriesDto.PatientsName;
            if (this.PatientID == null) this.PatientID = seriesDto.PatientID;
            if (this.PatientsBirthDate == null) this.PatientsBirthDate = seriesDto.PatientsBirthDate;
            if (this.PatientsSex == null) this.PatientsSex = seriesDto.PatientsSex;
            if (this.StudyInstanceUID == null) this.StudyInstanceUID = seriesDto.StudyInstanceUID;
            if (this.StudyID == null) this.StudyID = seriesDto.StudyID;
            if (this.SeriesNumber == null) this.SeriesNumber = seriesDto.SeriesNumber;
            if (this.NumberOfSeriesRelatedInstances == null) this.NumberOfSeriesRelatedInstances = seriesDto.NumberOfSeriesRelatedInstances;
            if (this.BodyPartExamined == null) this.BodyPartExamined = seriesDto.BodyPartExamined;
        }
    }
}
