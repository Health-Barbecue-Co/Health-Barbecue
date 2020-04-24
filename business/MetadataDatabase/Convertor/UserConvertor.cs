using MetadataDatabase.Data;
using MetadataDatabase.Models;
using MongoDB.Bson;
using System.Collections.Generic;
using System.Linq;

namespace MetadataDatabase.Convertor
{
    public static class UserConvertor
    {
        public static User ToModel(this UserDto userDto)
        {
            return new User
            {
                Id = userDto.Id.ToObjectId(),
                lastname = userDto.lastname,
                firstname = userDto.firstname,
                login = userDto.login,
                role = userDto.role
            };
        }
        public static UserDto ToDto(this User user)
        {
            return new UserDto
            {
                Id = user.Id.ToString(),
                lastname = user.lastname,
                firstname = user.firstname,
                login = user.login,
                role = user.role
            };
        }

        public static IEnumerable<UserDto> ToDto(this IEnumerable<User> user)
        {
            return user.Select(ToDto).ToList();
        }
    }
}