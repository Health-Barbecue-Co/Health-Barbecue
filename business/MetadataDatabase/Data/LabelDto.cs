namespace MetadataDatabase.Data
{
    public class LabelDto
    {
        public string Id { get; set; }
        public string UserId { get; set; }
        public string LabelKeyId { get; set; }
        public string LabelTypeId { get; set; }
        public string LabelValueId { get; set; }
        public string IsPublic { get; set; }
        public string IsApproved { get; set; }
        public string AssignedValue { get; set; }
    }
}
