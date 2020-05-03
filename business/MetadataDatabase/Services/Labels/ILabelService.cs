using MetadataDatabase.Data;
using MetadataDatabase.Models;

namespace MetadataDatabase.Services
{
    public interface ILabelService : ICrudService<LabelDto> 
    {
        public bool IsValid(LabelDto label);
    }
}