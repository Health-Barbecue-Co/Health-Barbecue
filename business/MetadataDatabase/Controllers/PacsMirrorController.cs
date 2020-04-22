using System;
using MetadataDatabase.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MetadataDatabase.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PacsMirrorController : ControllerBase
    {

        private readonly IPacsMirrorService pacsMirrorService;

        public PacsMirrorController(IPacsMirrorService pacsMirrorService)
        {
            this.pacsMirrorService = pacsMirrorService;
        }

        /// <summary>
        /// Update database regarding PACS. Mirror between database and PACS.
        /// </summary>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IActionResult MirrorPacs()
        {
            this.pacsMirrorService.MirrorPacs();
            return Ok();
        }
    }
}