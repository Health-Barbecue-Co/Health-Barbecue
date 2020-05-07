using System.Collections.Generic;
using MetadataDatabase.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MetadataDatabase.Models;
using MetadataDatabase.Data;
using System;

namespace MetadataDatabase.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LabelController : ControllerBase
    {
        private readonly ILabelService labelService;

        public LabelController(ILabelService labelService)
        {
            this.labelService = labelService;
        }

        // GET: api/Label
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<IEnumerable<LabelDto>> GetAllLabels()
        {
            return this.Ok(this.labelService.GetAll());
        }

        // GET: api/Label/5
        [HttpGet("{id}", Name = "GetLabel")]
        public ActionResult<LabelDto> GetLabel(string id)
        {
            var label = this.labelService.Get(id);
            if (label == null)
            {
                return NotFound();
            }
            return label;
        }

        // POST: api/Label
        /// <summary>
        /// Creates a Label.
        /// </summary>
        [HttpPost]
        public ActionResult<LabelDto> Post([FromBody] LabelDto label)
        {
            try
            {
                var labelWithId = this.labelService.Create(label);
                return CreatedAtRoute("GetLabel", new { id = labelWithId.Id }, labelWithId);
            } catch(Exception e)
            {
                return BadRequest(e.ToString());
            }
        }

        // PUT: api/Label/5
        [HttpPut("{id}")]
        public IActionResult Put(string id, [FromBody] LabelDto labelIn)
        {
            var label = this.labelService.Get(id);

            if (label == null)
            {
                return NotFound();
            }

            try
            {
                this.labelService.Update(id, labelIn);
            }
            catch (Exception e)
            {
                return BadRequest(e.ToString());
            }

     
            return NoContent();
        }

        /// <summary>
        /// Deletes a specific Label.
        /// </summary>
        /// <param name="id"></param> 
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var label = this.labelService.Get(id);

            if (label == null)
            {
                return NotFound();
            }

            this.labelService.Delete(id);

            return NoContent();
        }
    }
}
