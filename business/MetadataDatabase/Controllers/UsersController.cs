using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MetadataDatabase.Data;
using MetadataDatabase.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MetadataDatabase.Models;
using MetadataDatabase.Convertor;
using MongoDB.Driver;

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
        /// <summary>
        /// Get one  user.
        /// </summary>
        [HttpGet("{id}", Name = "GetUser")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<UserDto> Get(string id)
        {
            var user = this.userService.Get(id);
            if (user == null) {
                return NotFound();
            }
            return user;
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
        ///        "password": "user password"
        ///     }
        ///
        /// </remarks>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public ActionResult<UserDto> Post([FromBody] User user)
        {
            var found = this.userService.FindByLogin(user.login).ToList();
            if (found.Count > 0) {
                return Conflict();
            }
            var toCreateDto = UserConvertor.ToDto(user);
            var userWithId = this.userService.Create(toCreateDto);

            if (userWithId != null) {
                try {
                    this.userService.SetPassword(userWithId.Id.ToString(), user.password);
                    return CreatedAtRoute("GetUser", new { id = userWithId.Id.ToString() }, userWithId);
                } catch (MongoException e) {
                    return BadRequest(e.ToString());
                }
            } else {
                return BadRequest();
            }
        }

        // PUT: api/users/5
        /// <summary>
        /// update a specific user.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="userIn"></param>
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult Put(string id, [FromBody] UserRegisterDto userIn)
        {
            var user = this.userService.Get(id);
            if (user == null)
            {
                return NotFound();
            }

            var toUpdateDto = userIn.ToDto();

            this.userService.Update(id, toUpdateDto);
            if (userIn.password != "" && userIn.password != null) {
                this.userService.SetPassword(id, userIn.password);
            }

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
