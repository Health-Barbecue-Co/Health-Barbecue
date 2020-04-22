using System;
using System.Collections.Generic;
using MetadataDatabase.Repository;
using MetadataDatabase.Data;
using MetadataDatabase.Convertor;
using MetadataDatabase.framework.DAL;
using MongoDB.Bson;
using MongoDB.Driver;

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
            // objectToUpdate.Id = id;
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

            user.password = password;
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
    }
}