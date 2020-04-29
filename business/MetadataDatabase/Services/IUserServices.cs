using System.Collections.Generic;
using MetadataDatabase.Data;
using MetadataDatabase.Models;

namespace MetadataDatabase.Services
{
    public interface IUserServices : ICrudService<UserDto> {
        public UserDto SetPassword(string id, string password);

        public IEnumerable<UserDto> FindByLogin(string login);

        UserDto Authenticate(Authenticate authentication);
    }
}