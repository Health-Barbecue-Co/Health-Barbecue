using MetadataDatabase.Data;
using MetadataDatabase.Models;
using MongoDB.Bson;
using System.Collections.Generic;
using System.Linq;

namespace MetadataDatabase.Convertor
{
    public static class SeriesConvertor
    {
        public static Series ToModel(this SeriesDto seriesDto)
        {
            return new Series
            {
                Id = seriesDto.Id.ToObjectId(),
                SeriesInstanceUID = seriesDto.SeriesInstanceUID
            };
        }
        public static SeriesDto ToDto(this Series series)
        {
            return new SeriesDto
            {
                Id = series.Id.ToString(),
                SeriesInstanceUID = series.SeriesInstanceUID
            };
        }

        public static IEnumerable<SeriesDto> ToDto(this IEnumerable<Series> series)
        {
            return series.Select(ToDto).ToList();
        }
    }
}