using System.Collections.Generic;
using MetadataDatabase.Repository;
using MetadataDatabase.Data;
using MetadataDatabase.Convertor;
using MetadataDatabase.framework.DAL;
using MongoDB.Bson;

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
    }
}