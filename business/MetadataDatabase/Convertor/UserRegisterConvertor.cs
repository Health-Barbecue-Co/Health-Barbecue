using System;
using MetadataDatabase.Data;
using MetadataDatabase.Models;
using MongoDB.Bson;
using System.Collections.Generic;
using System.Linq;

namespace MetadataDatabase.Convertor
{
    public static class UserRegisterConvertor
    {
        public static UserDto ToUserDto(this UserRegisterDto user)
        {
            return new UserDto
            {
                Id = user.Id,
                lastname = user.lastname,
                firstname = user.firstname,
                login = user.login,
                role = user.role,
            };
        }
    }
}