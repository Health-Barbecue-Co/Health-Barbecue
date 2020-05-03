using MetadataDatabase.Controllers;
using MetadataDatabase.Data;
using System.Collections.Generic;

namespace MetadataDatabase.Services
{
    public interface IAlgoService
    {
        public string Execute(AlgoExeInfoDto algoExeInfo);
    }
}
