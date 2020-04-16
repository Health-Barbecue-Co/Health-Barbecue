using MetadataDatabase.Controllers;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MetadataDatabase.Services
{
    public interface IPacsMirrorServices
    {
        public void CheckForUpdates();
        public void testPacsMirror();
        
    }
}
