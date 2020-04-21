using System.Text.Json.Serialization;

public class Metadata
{
    public enum DicomTag
    {
        BodyPartExamined
    }

    // Character Set that expands or replaces the Basic Graphic Set. (00080005)
    [JsonPropertyName("00180015")]
    public DicomStringObject BodyPartExamined { get; set; }

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