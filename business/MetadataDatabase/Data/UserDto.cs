using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MetadataDatabase.Data
{
    public class UserDto
    {
        public string Id { get; set; }
        public string firstname { get; set; }
        public string lastname { get; set; }

        public string login { get; set; }

        public string role { get; set; }
    }
}
