using MetadataDatabase.Data;
using MetadataDatabase.Models;
using MongoDB.Bson;
using System.Collections.Generic;
using System.Linq;

namespace MetadataDatabase.Convertor
{
    public static class AlgoConvertor
    {
        public static Algo ToModel(this AlgoDto algoDto)
        {
            return new Algo
            {
                Id = algoDto.Id.ToObjectId(),
                User = algoDto.User,
                Name = algoDto.Name,
                MainFile = algoDto.MainFile,
                ContentFile = algoDto.ContentFile,
                Description = algoDto.Description
            };
        }
        public static AlgoDto ToDto(this Algo algo)
        {
            return new AlgoDto
            {
                Id = algo.Id.ToString(),
                User = algo.User,
                Name = algo.Name,
                MainFile = algo.MainFile,
                ContentFile = algo.ContentFile,
                Description = algo.Description
            };
        }

        public static IEnumerable<AlgoDto> ToDto(this IEnumerable<Algo> algo)
        {
            return algo.Select(ToDto).ToList();
        }
    }
}