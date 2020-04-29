namespace MetadataDatabase.Models
{
    public class AuthConfiguration
    {
        public string Secret { get; set; }
        public int TokenValidityDuration { get; set; }
    }
}