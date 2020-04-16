﻿using MetadataDatabase.Controllers;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MetadataDatabase.Services
{
    public interface IPacsServices
    {
        public Task<IEnumerable<QidoDicomSeries>> GetSeries();

        public void TestPacsService();
    }
}