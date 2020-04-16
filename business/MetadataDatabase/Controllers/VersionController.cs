using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MetadataDatabase.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VersionController : ControllerBase
    {
        /// <summary>
        /// Gets the Assembly version.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<Version> Get()
        {
            var version = typeof(VersionController).Assembly.GetName().Version;
            return this.Ok(version);
        }

        /// <summary>
        /// Gets the Assembly version.
        /// </summary>
        /// <returns></returns>
        [HttpGet("api")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<String> GetApiVersion()
        {
            var version = "1.0"; // TODO use global API versioning
            return this.Ok(version);
        }

    }
}