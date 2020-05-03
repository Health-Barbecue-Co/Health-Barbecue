using MetadataDatabase.Data;

namespace MetadataDatabase.Services
{
    public interface IPacsMirrorService
    {
        public void MirrorPacs();
        public string DownloadSeries(string seriesUID);
    }
}
