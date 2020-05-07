using MetadataDatabase.Data;
using MetadataDatabase.Models;
using MongoDB.Bson;
using System.Collections.Generic;
using System.Linq;

namespace MetadataDatabase.Convertor
{
    public static class LabelConvertor
    {
        public static Label ToModel(this LabelDto labelDto)
        {
            return new Label
            {
                Id = labelDto.Id.ToObjectId(),
                User = labelDto.User,
                LabelKey = labelDto.LabelKey,
                LabelType = labelDto.LabelType,
                LabelValue = labelDto.LabelValue,
                IsPublic = labelDto.IsPublic,
                IsApproved = labelDto.IsApproved,
                AssignedValue = labelDto.AssignedValue,
            };
        }
        public static LabelDto ToDto(this Label label)
        {
            return new LabelDto
            {
                Id = label.Id.ToString(),
                User = label.User,
                LabelKey = label.LabelKey,
                LabelType = label.LabelType,
                LabelValue = label.LabelValue,
                IsPublic = label.IsPublic,
                IsApproved = label.IsApproved,
                AssignedValue = label.AssignedValue,
            };
        }

        public static IEnumerable<LabelDto> ToDto(this IEnumerable<Label> label)
        {
            return label.Select(ToDto).ToList();
        }
    }
}