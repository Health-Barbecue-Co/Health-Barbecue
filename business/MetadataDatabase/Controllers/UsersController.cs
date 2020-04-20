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
    public class UsersController : ControllerBase
    {
        private readonly IUserServices userService;

        public UsersController(IUserServices userService)
        {
            this.userService = userService;
        }

        // GET: api/users
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<IEnumerable<UserDto>> Get()
        {
            return this.Ok(this.userService.GetAll());
        }

        // GET: api/users/5
        [HttpGet("{id}", Name = "GetUser")]
        public ActionResult<UserDto> Get(string id)
        {
            return this.userService.Get(id);
        }

        // POST: api/users
        /// <summary>
        /// Creates a user.
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /
        ///     {
        ///        "lastname": "user lastname"
        ///        "firstname": "user firstname"
        ///        "login": "user login"
        ///        "role": "user role"
        ///     }
        ///
        /// </remarks>
        [HttpPost]
        public ActionResult<UserDto> Post([FromBody] UserDto user)
        {
            var userWithId = this.userService.Create(user);
            return CreatedAtRoute("GetUser", new { id = userWithId.Id.ToString() }, userWithId);
        }

        // PUT: api/users/5
        [HttpPut("{id}")]
        public IActionResult Put(string id, [FromBody] UserDto userIn)
        {
            var user = this.userService.Get(id);

            if (user == null)
            {
                return NotFound();
            }

            this.userService.Update(id, userIn);

            return NoContent();
        }

        /// <summary>
        /// Deletes a specific user.
        /// </summary>
        /// <param name="id"></param>
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var user = this.userService.Get(id);

            if (user == null)
            {
                return NotFound();
            }

            this.userService.Delete(id);

            return NoContent();
        }
    }
}
