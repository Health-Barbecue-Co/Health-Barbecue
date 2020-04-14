namespace MetadataDatabase.Models
{
    public class SeriesDBSettings : ISeriesDBSettings
    {
        public string Database { get; set; }
        public string Host { get; set; }
        public string Port { get; set; }
        public string Collection { get; set; }
    }

    public interface ISeriesDBSettings
    {
        string Database { get; set; }
        string Host { get; set; }
        string Port { get; set; }
        string Collection { get; set; }
    }
}