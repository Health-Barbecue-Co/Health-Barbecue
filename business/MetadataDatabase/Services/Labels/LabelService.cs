using MetadataDatabase.Convertor;
using MetadataDatabase.Data;
using MetadataDatabase.Models;
using MetadataDatabase.Repository;
using System.Collections.Generic;

namespace MetadataDatabase.Services
{
    public class LabelService : ILabelService
    {
        private readonly ILabelRepository labelRepository;

        public LabelService(ILabelRepository labelRepository)
        {
            this.labelRepository = labelRepository;
        }

        public LabelDto Create(LabelDto objectToCreate)
        {
            return this.labelRepository.Create(objectToCreate.ToModel()).ToDto();
        }

        public void Delete(string id)
        {
            this.labelRepository.Delete(id.ToObjectId());
        }

        public LabelDto Get(string id)
        {
            return this.labelRepository.Get(id.ToObjectId()).ToDto();
        }

        public IEnumerable<LabelDto> GetAll()
        {
            return this.labelRepository.GetAll().ToDto();
        }

        public void Update(string id, LabelDto objectToUpdate)
        {
            objectToUpdate.Id = id;
            this.labelRepository.Update(objectToUpdate.ToModel());
        }

        public bool IsValid(LabelDto label)
        {
            if(label.LabelType == "Multi")
            {
                if(label.LabelValue.Length == 0) { return false; }
                // All label values should not be empty
                foreach (string value in label.LabelValue)
                {
                    if (!CheckValue(value)) { return false; }
                }
            }
            return (CheckValue(label.LabelKey)
                && CheckValue(label.LabelType)
                && CheckValue(label.User)
            );
        }

        private bool CheckValue(string value)
        {
            value = value.Replace(" ", string.Empty);
            return (value != string.Empty);
        }
    }
}
