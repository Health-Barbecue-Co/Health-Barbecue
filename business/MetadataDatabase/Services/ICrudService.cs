using System.Collections.Generic;

namespace MetadataDatabase.Services
{
    public interface ICrudService<T>
    {
        IEnumerable<T> GetAll();

        T Get(string id);

        T Create(T objectToCreate);

        void Update(string id, T objectToUpdate);

        void Delete(string id);
    }
}