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
using Microsoft.AspNetCore.Authorization;

namespace MetadataDatabase.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
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
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public ActionResult<UserDto> Post([FromBody] UserRegisterDto user)
        {
            var found = this.userService.FindByLogin(user.login).ToList();
            if (found.Count > 0) {
                return Conflict();
            }

            try {
                var toCreateDto = UserRegisterConvertor.ToUserDto(user);
                var userWithId = this.userService.Create(toCreateDto);

                if (userWithId != null) {
                    this.userService.SetPassword(userWithId.Id.ToString(), user.password);
                    return CreatedAtRoute("GetUser", new { id = userWithId.Id.ToString()}, userWithId);
                } else {
                    throw new Exception("An error occured during the creation");
                }
            } catch (Exception err) {
                return BadRequest(err.Message);
            }
        }

        // PUT: api/users/5
        /// <summary>
        /// update a specific user.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="userIn"></param>
        [HttpPut("{id}")]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Put(string id, [FromBody] UserRegisterDto userIn)
        {
            var user = this.userService.Get(id);
            if (user == null)
            {
                return NotFound();
            }

            try {
                this.userService.Update(id, userIn.ToUserDto());
                if (userIn.password != "" && userIn.password != null) {
                    this.userService.SetPassword(id, userIn.password);
                }

                return NoContent();
            } catch (Exception e) {
                return BadRequest(e.ToString());
            }
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
