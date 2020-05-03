using System;
using MetadataDatabase.Data;
using MetadataDatabase.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MetadataDatabase.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlgoController : ControllerBase
    {

        private readonly IAlgoService algoService;

        public AlgoController(IAlgoService algoService)
        {
            this.algoService = algoService;
        }

        /// <summary>
        /// Execute an algorithm
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /
        ///     {
        ///         "user": "string",
        ///         "name": "string",
        ///         "seriesUid": "1.3.12.2.1107.5.2.30.26626.30000011032311153339000012977"
        ///     }
        ///
        /// </remarks>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IActionResult Execute([FromBody] AlgoExeInfoDto algoExeInfo)
        {
            var res = this.algoService.Execute(algoExeInfo);
            return Ok(res);
        }
    }
}