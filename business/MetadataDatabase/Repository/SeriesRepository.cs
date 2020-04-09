using MetadataDatabase.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MetadataDatabase.Repository
{
    public class SeriesRepository : ISeriesRepository
    {
        /// <summary>
        /// Get all the series;
        /// </summary>
        /// <returns></returns>
        public IEnumerable<SeriesDto> GetAll()
        {
            // TODO : Connect to Mongo DB here.

            return new[] {
                new SeriesDto { SeriesInstanceUID ="ID 1"} ,
                new SeriesDto { SeriesInstanceUID ="ID 2"} ,
                new SeriesDto { SeriesInstanceUID ="ID 3"} ,
                new SeriesDto { SeriesInstanceUID ="ID 4"} ,
                new SeriesDto { SeriesInstanceUID ="ID 5"} ,
            };
        }
    }
}
