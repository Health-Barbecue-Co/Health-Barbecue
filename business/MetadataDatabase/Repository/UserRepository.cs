using MetadataDatabase.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using MongoDB.Driver;
using MetadataDatabase.Models;
using MetadataDatabase.framework.DAL;
using MongoDB.Bson;
using System.Linq.Expressions;
using Microsoft.Extensions.Options;

namespace MetadataDatabase.Repository
{

    public class UserRepository : MongoRepositoryBase<User>, IUserRepository
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="IUserRepository"/> class.
        /// </summary>
        /// <param name="configuration">The configuration.</param>
        public UserRepository(IOptions<MongoConfiguration> configuration) : base(configuration.Value)
        {

        }
    }
}
