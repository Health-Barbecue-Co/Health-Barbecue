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

        public void testPacsMirror()
        {
            Console.Write("testPacsMirror !");
        }
        public void CheckForUpdates()
        {
            Task<IEnumerable<QidoDicomSeries>> task = this.pacsService.GetSeries();
            task.Wait();
            var orthancSeriesList = task.Result?.ToDto();
            //foreach (var series in orthancSeriesList)
            //    Console.Write(series.GetValueOfDicomTag(QidoDicomSeries.DicomTag.SeriesInstanceUID) + "\n");
            var dataBaseSeries = this.seriesService.GetAll();
            //foreach (var series in dataBaseSeries)
            //    Console.Write(series.SeriesInstanceUID + "\n");

            IEnumerable<SeriesDto> seriesNotInPacs = dataBaseSeries.Except(orthancSeriesList);
            IEnumerable<SeriesDto> seriesNotInDb = orthancSeriesList.Except(dataBaseSeries);
            Console.WriteLine("series Not In Pacs");
            foreach (SeriesDto series in seriesNotInPacs)
            {
                Console.WriteLine(series.SeriesInstanceUID);
                this.seriesService.Delete(series.Id);
            }

            Console.WriteLine("series Not In Db");
            foreach (SeriesDto series in seriesNotInDb)
            {
                Console.WriteLine(series.SeriesInstanceUID);
                this.seriesService.Create(series);
            }
        }
    }
}