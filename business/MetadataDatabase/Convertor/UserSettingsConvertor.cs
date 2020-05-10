using System;
using MetadataDatabase.Data;
using MetadataDatabase.Models;
using MongoDB.Bson;
using System.Collections.Generic;
using System.Linq;

namespace MetadataDatabase.Convertor
{
    public static class UserSettingsConvertor
    {
        public static UserSettingsDto ToUserSettingsDto(this UserSettings settings)
        {
            return new UserSettingsDto
            {
							theme = settings.theme.ToUserThemeDto()
            };
        }

				public static UserSettings ToModel(this UserSettingsDto settingsDto)
        {
            return new UserSettings
            {
							theme = settingsDto.theme.ToModel()
            };
        }
    }
}