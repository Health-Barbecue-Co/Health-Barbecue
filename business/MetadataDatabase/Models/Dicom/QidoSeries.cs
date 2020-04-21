using System.Text.Json.Serialization;

namespace MetadataDatabase.Controllers
{
    /// <summary>Class to deserialize Query based on ID for DICOM Objects (QIDO) json response</summary>
    public class QidoSeries
    {
        public enum DicomTag
        {
            SpecificCharacterSet,
            StudyDate,
            StudyTime,
            AccessionNumber,
            Modality,
            ReferringPhysiciansName,
            SeriesDescription,
            RetrieveURLAttribute,
            PatientsName,
            PatientID,
            PatientsBirthDate,
            PatientsSex,
            StudyInstanceUID,
            SeriesInstanceUID,
            StudyID,
            SeriesNumber,
            NumberOfSeriesRelatedInstances
        }
        // Character Set that expands or replaces the Basic Graphic Set. (00080005)
        [JsonPropertyName("00080005")]
        public DicomStringObject SpecificCharacterSet { get; set; }

        // Date the Study started. (00080020)
        [JsonPropertyName("00080020")]
        public DicomStringObject StudyDate { get; set; }

        // Time the Study started. (00080030)
        [JsonPropertyName("00080030")]
        public DicomStringObject StudyTime { get; set; }

        // A RIS generated number that identifies the order for the Study. (00080050)
        [JsonPropertyName("00080050")]
        public DicomStringObject AccessionNumber { get; set; }

        // Type of equipment that originally acquired the data. (00080060)
        [JsonPropertyName("00080060")]
        public DicomStringObject Modality { get; set; }

        // Name of the patient's referring physician (00080090)
        [JsonPropertyName("00080090")]
        public DicomNameObject ReferringPhysiciansName { get; set; }

        // User provided description of the Series (0008103E)
        [JsonPropertyName("0008103E")]
        public DicomStringObject SeriesDescription { get; set; }

        // URL specifying the location of the referenced instance(s). (00081190)
        [JsonPropertyName("00081190")]
        public DicomStringObject RetrieveURLAttribute { get; set; }

        // Patient's full name. (00100010)
        [JsonPropertyName("00100010")]
        public DicomNameObject PatientsName { get; set; }

        // Primary hospital identification number or code for the patient. (00100020)
        [JsonPropertyName("00100020")]
        public DicomStringObject PatientID { get; set; }

        // Birth date of the patient. (00100030)
        [JsonPropertyName("00100030")]
        public DicomStringObject PatientsBirthDate { get; set; }

        // Sex of the named patient. (00100040)
        [JsonPropertyName("00100040")]
        public DicomStringObject PatientsSex { get; set; }

        // Unique identifier for the Study (0020000D)
        [JsonPropertyName("0020000D")]
        public DicomStringObject StudyInstanceUID { get; set; }

        // Unique identifier of the Series. (0020000E)
        [JsonPropertyName("0020000E")]
        public DicomStringObject SeriesInstanceUID { get; set; }

        // User or equipment generated Study identifier (00200010)
        [JsonPropertyName("00200010")]
        public DicomStringObject StudyID { get; set; }

        // A number that identifies this Series. (00200011)
        [JsonPropertyName("00200011")]
        public DicomIntObject SeriesNumber { get; set; }

        // The number of Composite Object Instances in a Series that match the Series level Query/Retrieve search criteria (00201209)
        [JsonPropertyName("00201209")]
        public DicomIntObject NumberOfSeriesRelatedInstances { get; set; }

        public string GetValueOfDicomTag(DicomTag propertyName)
        {
            string resultValue = "";
            var dicomPrpertyType = this.GetType().GetProperty(propertyName.ToString()).PropertyType.Name;
            switch (dicomPrpertyType)
            {
                case nameof(DicomStringObject):
                    var dicomStringValue = (DicomStringObject)this.GetType().GetProperty(propertyName.ToString()).GetValue(this, null);
                    if (dicomStringValue != null && dicomStringValue.Value != null)
                    {
                        resultValue = dicomStringValue.Value[0];
                    }
                    break;
                case nameof(DicomIntObject):
                    var dicomIntValue = (DicomIntObject)this.GetType().GetProperty(propertyName.ToString()).GetValue(this, null);
                    if (dicomIntValue != null && dicomIntValue.Value != null)
                    {
                        resultValue = dicomIntValue.Value[0].ToString();
                    }
                    break;
                case nameof(DicomNameObject):
                    var dicomNameObject = (DicomNameObject)this.GetType().GetProperty(propertyName.ToString()).GetValue(this, null);
                    if (dicomNameObject != null && dicomNameObject.Value != null)
                    {
                        resultValue = dicomNameObject.Value[0].Alphabetic;
                    }
                    break;
                default:
                    break;
            }
            return resultValue;
        }
    }
}