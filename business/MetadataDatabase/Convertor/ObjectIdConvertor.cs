using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MetadataDatabase.Convertor
{
    public static class ObjectIdConvertor
    {
        /// <summary>
        /// Converts a string to an objectid.
        /// </summary>
        /// <param name="str">The string.</param>
        /// <returns></returns>
        public static ObjectId ToObjectId(this string str)
        {
            if (ObjectId.TryParse(str, out ObjectId result))
            {
                return result;
            }
            // trow an exception ??
            return ObjectId.Empty;
        }

    }
}
