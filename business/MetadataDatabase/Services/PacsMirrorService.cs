using MetadataDatabase.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MetadataDatabase.Controllers;
using MetadataDatabase.Data;
using MetadataDatabase.Convertor;
using Microsoft.Extensions.Logging;

namespace MetadataDatabase.Services
{
    public class PacsMirrorService: IPacsMirrorService
    {
        private readonly IPacsService pacsService;
        private readonly ILogger<PacsMirrorService> logger;
        private readonly ISeriesServices seriesService;

        public PacsMirrorService(ILogger<PacsMirrorService> logger, ISeriesServices seriesService, IPacsService pacsService)
        {
            this.pacsService = pacsService;
            this.logger = logger;
            this.seriesService = seriesService;
        }

        /// <summary>
        /// Update database regarding PACS. Mirror between database and PACS.
        /// Every missing Series from the PACS will be created.
        /// Every Series not on the PACS but in mogo DB will be deleted from the DB.
        /// </summary>
        public void MirrorPacs()
        {
            logger.LogInformation("Start miroring PACS");
            // Get all series on PACS
            Task<IEnumerable<QidoSeries>> task = this.pacsService.GetSeriesAsync();
            task.Wait();
            var pacsSeries = task.Result?.ToDto();
            // Get all series on DB
            logger.LogInformation($"Found {pacsSeries.Count()} series in PACS");
            var dataBaseSeries = this.seriesService.GetAll();
            // Get SeriesInstanceUID to compare
            IEnumerable<string> pacsSeriesUids = pacsSeries.Select(series => series.SeriesInstanceUID);
            IEnumerable<string> dataBaseSeriesUids = dataBaseSeries.Select(series => series.SeriesInstanceUID);
            // Delete into DB all series not in the PACS
            IEnumerable<string> seriesUidsNotInPacs = dataBaseSeriesUids.Except(pacsSeriesUids);
            foreach (string uid in seriesUidsNotInPacs)
            {
                IEnumerable<SeriesDto> query = dataBaseSeries.Where(series => series.SeriesInstanceUID == uid);
                var serieIdToRemove = query.FirstOrDefault().Id;
                logger.LogInformation($"Removed serie : {serieIdToRemove}");
                this.seriesService.Delete(serieIdToRemove);
            }
            // Create into DB all series not in the DB but in PACS
            IEnumerable<string> seriesUidsNotInDb = pacsSeriesUids.Except(dataBaseSeriesUids);
            foreach (string uid in seriesUidsNotInDb)
            {
                IEnumerable<SeriesDto> query = pacsSeries.Where(series => series.SeriesInstanceUID == uid);
                logger.LogInformation($"Added serie : {uid}");
                this.seriesService.Create(query.FirstOrDefault());
            }
            logger.LogInformation($"Synchronisation done");

        }
    }
}