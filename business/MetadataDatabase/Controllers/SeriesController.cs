using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MetadataDatabase.Data;
using MetadataDatabase.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MetadataDatabase.Models;

namespace MetadataDatabase.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeriesController : ControllerBase
    {
        private readonly ISeriesServices seriesService;

        public SeriesController(ISeriesServices seriesService)
        {
            this.seriesService = seriesService;
        }

        // GET: api/Series
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<IEnumerable<SeriesDto>> Get()
        {
            return this.Ok(this.seriesService.GetAll());
        }

        // GET: api/Series/5
        [HttpGet("{id}", Name = "GetSeries")]
        public ActionResult<SeriesDto> Get(string id)
        {
            return this.seriesService.Get(id);
        }

        // POST: api/Series
        /// <summary>
        /// Creates a Series.
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /
        ///     {
        ///        "SeriesInstanceUID": "1.3.12.2.1107.5.2.30.26626.30000011032311153339000007041"
        ///     }
        ///
        /// </remarks>
        [HttpPost]
        public ActionResult<SeriesDto> Post([FromBody] SeriesDto series)
        {
            var seriesWithId = this.seriesService.Create(series);
            return CreatedAtRoute("GetSeries", new { id = seriesWithId.Id.ToString() }, seriesWithId);
        }

        // PUT: api/Series/5
        [HttpPut("{id}")]
        public IActionResult Put(string id, [FromBody] SeriesDto seriesIn)
        {
            var series = this.seriesService.Get(id);

            if (series == null)
            {
                return NotFound();
            }

            this.seriesService.Update(id, seriesIn);

            return NoContent();
        }

        /// <summary>
        /// Deletes a specific Series.
        /// </summary>
        /// <param name="id"></param>
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var series = this.seriesService.Get(id);

            if (series == null)
            {
                return NotFound();
            }

            this.seriesService.Delete(id);

            return NoContent();
        }
    }
}
