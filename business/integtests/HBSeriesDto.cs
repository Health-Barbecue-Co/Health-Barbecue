using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json;

namespace IntegTests
{
    /// <summary>
    /// Class representing a Series
    /// </summary>
    public class HBSeriesDto
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

        public override bool Equals(Object obj)
        {
            //Check for null and compare run-time types.
            if ((obj == null) || !this.GetType().Equals(obj.GetType()))
            {
                return false;
            }
            else
            {
                HBSeriesDto series = (HBSeriesDto) obj;

                return Id == series.Id
                    && SeriesInstanceUID == series.SeriesInstanceUID
                    && SpecificCharacterSet == series.SpecificCharacterSet
                    && StudyDate == series.StudyDate
                    && StudyTime == series.StudyTime
                    && AccessionNumber == series.AccessionNumber
                    && Modality == series.Modality
                    && ReferringPhysiciansName == series.ReferringPhysiciansName
                    && SeriesDescription == series.SeriesDescription
                    && RetrieveURLAttribute == series.RetrieveURLAttribute
                    && PatientsName == series.PatientsName
                    && PatientID == series.PatientID
                    && PatientsBirthDate == series.PatientsBirthDate
                    && PatientsSex == series.PatientsSex
                    && StudyInstanceUID == series.StudyInstanceUID
                    && StudyID == series.StudyID
                    && SeriesNumber == series.SeriesNumber
                    && NumberOfSeriesRelatedInstances == series.NumberOfSeriesRelatedInstances;
            }
        }

        public string toJson()
        {
            return JsonConvert.SerializeObject(this);
        }

    }
}
