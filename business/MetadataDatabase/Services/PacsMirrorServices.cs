using MetadataDatabase.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MetadataDatabase.Controllers;
using MetadataDatabase.Data;
using MetadataDatabase.Convertor;

namespace MetadataDatabase.Services
{
    public class PacsMirrorServices: IPacsMirrorServices
    {
        private readonly IPacsServices pacsService;
        private readonly ISeriesServices seriesService;

        public PacsMirrorServices(ISeriesServices seriesService, IPacsServices pacsService)
        {
            this.pacsService = pacsService;
            this.seriesService = seriesService;
        }

        public void MirrorPacs()
        {
            // Get all series on PACS
            Task<IEnumerable<QidoSeries>> task = this.pacsService.GetSeries();
            task.Wait();
            var pacsSeries = task.Result?.ToDto();
            // Get all series on DB
            var dataBaseSeries = this.seriesService.GetAll();
            // Get SeriesInstanceUID to compare
            IEnumerable<string> pacsSeriesUids = pacsSeries.Select(series => series.SeriesInstanceUID);
            IEnumerable<string> dataBaseSeriesUids = dataBaseSeries.Select(series => series.SeriesInstanceUID);
            // Delete into DB all series not in the PACS
            Console.WriteLine("series Not In Pacs:");
            IEnumerable<string> seriesUidsNotInPacs = dataBaseSeriesUids.Except(pacsSeriesUids);
            foreach (string uid in seriesUidsNotInPacs)
            {
                Console.WriteLine(uid);
                IEnumerable<SeriesDto> query = dataBaseSeries.Where(series => series.SeriesInstanceUID == uid);
                this.seriesService.Delete(query.FirstOrDefault().Id);
            }
            // Create into DB all series not in the DB but in PACS
            Console.WriteLine("series Not In Db:");
            IEnumerable<string> seriesUidsNotInDb = pacsSeriesUids.Except(dataBaseSeriesUids);
            foreach (string uid in seriesUidsNotInDb)
            {
                Console.WriteLine(uid);
                IEnumerable<SeriesDto> query = pacsSeries.Where(series => series.SeriesInstanceUID == uid);
                this.seriesService.Create(query.FirstOrDefault());
            }
        }
    }
}