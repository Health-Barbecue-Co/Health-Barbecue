using System;
using MetadataDatabase.Data;
using MetadataDatabase.Models;
using MongoDB.Bson;
using System.Collections.Generic;
using System.Linq;

namespace MetadataDatabase.Convertor
{
    public static class UserThemeConvertor
    {
        public static UserThemeDto ToUserThemeDto(this UserTheme theme)
        {
            return new UserThemeDto
            {
                index = theme.index,
                dark = theme.dark
            };
        }

				public static UserTheme ToModel(this UserThemeDto themeDto)
        {
            return new UserTheme
            {
                index = themeDto.index,
                dark = themeDto.dark
            };
        }
    }
}