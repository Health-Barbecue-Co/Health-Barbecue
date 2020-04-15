using System.Collections.Generic;

namespace MetadataDatabase.Repository
{
    public interface IRepository<T>
    {
        // api/[GET]
        public IEnumerable<T> GetAll();

        // api/1/[GET]
        public T Get(string id);
        // api/[POST]
        public T Create(T entity);

        // api/[PUT]
        public T Update(string id, T entity);

        // api/1/[DELETE]
        public bool Delete(string id);
    }
}