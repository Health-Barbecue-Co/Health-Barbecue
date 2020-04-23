using MetadataDatabase.Data;
using MetadataDatabase.Models;
using MongoDB.Bson;
using System.Collections.Generic;
using System.Linq;

namespace MetadataDatabase.Convertor
{
    public static class UserRegisterConvertor
    {
        public static User ToModel(this UserRegisterDto userRegisterDto)
        {
            return new User
            {
                Id = userRegisterDto.Id.ToObjectId(),
                lastname = userRegisterDto.lastname,
                firstname = userRegisterDto.firstname,
                login = userRegisterDto.login,
                role = userRegisterDto.role,
                password = userRegisterDto.password,
            };
        }
        public static UserDto ToDto(this UserRegisterDto user)
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
    }
}