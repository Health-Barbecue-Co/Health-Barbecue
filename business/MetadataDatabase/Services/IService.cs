using System.Collections.Generic;

namespace MetadataDatabase.Services
{
    public interface IService<T>
    {
        IEnumerable<T> GetAll();
    }
}