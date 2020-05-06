using System;
using System.Collections.Generic;
using System.IO;
using MetadataDatabase.Data;
using MetadataDatabase.Models;
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
        ///         "seriesInstanceUID": "1.3.12.2.1107.5.2.30.26626.30000011032311153339000012977"
        ///         "folder": "string"
        ///     }
        ///
        /// </remarks>
        [HttpPost("execute")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IActionResult Execute([FromBody] AlgoExeInfoDto algoExeInfo)
        {
            var res = this.algoService.Execute(algoExeInfo);
            return Ok(res);
        }

        //[HttpPost("create")]
        //[ProducesResponseType(StatusCodes.Status200OK)]
        //public IActionResult Create([FromBody] AlgoDto algo)
        //{
        //    System.IO.File.WriteAllText(algo.Name, algo.ContentFile);
        //    return Ok();
        //}

        // GET: api/Algo
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<IEnumerable<AlgoDto>> Get()
        {
            return this.Ok(this.algoService.GetAll());
        }

        // GET: api/Algo/5
        [HttpGet("{id}", Name = "GetAlgo")]
        public ActionResult<AlgoDto> Get(string id)
        {
            return this.algoService.Get(id);
        }

        // POST: api/Algo
        /// <summary>
        /// Creates an Algo.
        /// </summary>
        [HttpPost]
        public ActionResult<LabelDto> Post([FromBody] AlgoDto algo)
        {
            var algoWithId = this.algoService.Create(algo);
            try
            {
                Directory.CreateDirectory("workspace/algos/");
                System.IO.File.WriteAllText(("workspace/algos/" + algo.MainFile), algo.ContentFile);
                return CreatedAtRoute("GetAlgo", new { id = algoWithId.Id }, algoWithId);
            } catch(Exception e)
            {
                return this.Problem(e.ToString());
            }
        }

        /// <summary>
        /// Deletes a specific Algo.
        /// </summary>
        /// <param name="id"></param>
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var algo = this.algoService.Get(id);

            if (algo == null)
            {
                return NotFound();
            }

            this.algoService.Delete(id);

            return NoContent();
        }
    }
}