using System.Linq;
using System;
using System.Collections.Generic;
using MetadataDatabase.Repository;
using MetadataDatabase.Data;
using MetadataDatabase.Convertor;
using MetadataDatabase.framework.DAL;
using MongoDB.Bson;
using MongoDB.Driver;
using MetadataDatabase.Models;

namespace MetadataDatabase.Services
{
    public class UserServices : IUserServices
    {
        private readonly IUserRepository userRepository;

        /// <summary>
        /// Initializes a new instance of the <see cref="UserServices"/> class.
        /// </summary>
        /// <param name="userRepository">The series repository.</param>
        public UserServices(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }

        /// <summary>
        /// Creates the provided series.
        /// </summary>
        /// <param name="objectToCreate">The series to create.</param>
        /// <returns></returns>
        public UserDto Create(UserDto objectToCreate)
        {
            return this.userRepository.Create(objectToCreate.ToModel()).ToDto();
        }

        /// <summary>
        /// Deletes the specified series.
        /// </summary>
        /// <param name="id">The identifier.</param>
        public void Delete(string id)
        {
            this.userRepository.Delete(id.ToObjectId());
        }

        /// <summary>
        /// Gets the series by the specified identifier.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns></returns>
        public UserDto Get(string id)
        {
            return this.userRepository.Get(id.ToObjectId())?.ToDto();
        }

        /// <summary>
        /// Gets all the series.
        /// </summary>
        /// <returns></returns>
        public IEnumerable<UserDto> GetAll()
        {
            return this.userRepository.GetAll()?.ToDto();
        }

        /// <summary>
        /// Updates the specified series.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <param name="objectToUpdate">The series to update.</param>
        public void Update(string id, UserDto objectToUpdate)
        {
            objectToUpdate.Id = id;
            this.userRepository.Update(objectToUpdate.ToModel());
        }

        /// <summary>
        /// set the password of specified series.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <param name="password">The password to update.</param>
        public UserDto SetPassword(string id, string password)
        {
            var user = this.userRepository.Get(id.ToObjectId());
            if (user == null) {
                throw new MongoException($"User not found with id='{id}'");
            }

            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            this.userRepository.Update(user);
            return user.ToDto();
        }

        /// <summary>
        /// find user thanks to its login
        /// </summary>
        /// <param name="login">The identifier.</param>
        public IEnumerable<UserDto> FindByLogin(string login)
        {
            return this.userRepository.GetBySpecification(user => user.login == login).ToDto();
        }

        /// <summary>
        /// authenticate someone
        /// </summary>
        /// <param name="login">user login</param>
        /// <param name="password">user password</param>
        public UserDto Authenticate(string login, string password)
        {
            if (string.IsNullOrEmpty(login) || string.IsNullOrEmpty(password)){
                return null;
            }

            var user = this.userRepository.GetBySpecification(user => user.login == login).ToList().First();

            // check if login exists
            if (user == null){
                return null;
            }

            // check if password is correct
            if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
                return null;

            // authentication successful
            return user.ToDto();
        }


        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");

            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private static bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");
            if (storedHash.Length != 64) throw new ArgumentException("Invalid length of password hash (64 bytes expected).", "passwordHash");
            if (storedSalt.Length != 128) throw new ArgumentException("Invalid length of password salt (128 bytes expected).", "passwordHash");

            using (var hmac = new System.Security.Cryptography.HMACSHA512(storedSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != storedHash[i]) return false;
                }
            }

            return true;
        }
    }
}