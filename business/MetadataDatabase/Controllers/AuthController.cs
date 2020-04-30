using System.Linq;
using System;
using MetadataDatabase.Data;
using MetadataDatabase.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MetadataDatabase.Models;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Options;
using System.Text;
using Microsoft.Net.Http.Headers;

namespace MetadataDatabase.Controllers {
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController: ControllerBase {
        private IUserServices userService;

        private readonly AuthConfiguration settings;
        private readonly SymmetricSecurityKey signinKey;


        public AuthController(IUserServices userService, IOptions<AuthConfiguration> settings) {
            this.userService = userService;
            this.settings = settings.Value;
            this.signinKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(this.settings.Secret));
        }

        // Generate a Token with expiration date and Claim meta-data.
        // And sign the token with the signinKey
        private string GenerateToken(string id) {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(this.settings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor {
                Subject = new ClaimsIdentity(new Claim[] {
                    new Claim(ClaimTypes.Name, id)
                }),
                NotBefore = new DateTimeOffset(DateTime.Now).DateTime,
                Expires = DateTime.UtcNow.AddMinutes(this.settings.TokenValidityDuration),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<UserAuthenticatedDto> Authenticate([FromBody] Authenticate model) {
            try {
                var userList= this.userService.FindByLogin(model.Username).ToList();
                if (userList.Count == 0) {
                    return NotFound(new {
                        message = "Username not found"
                    });
                }

                var user = this.userService.Authenticate(model);

                if (user == null) {
                    return BadRequest(new {
                        message = "Username or password is incorrect"
                    });
                }

                var tokenString = GenerateToken(user.Id.ToString());

                // return basic user info and authentication token
                return Ok(new UserAuthenticatedDto {
                    Id = user.Id,
                    login = user.login,
                    firstname = user.firstname,
                    lastname = user.lastname,
                    token = tokenString
                });
            } catch(Exception error) {
                return BadRequest(error);
            }
        }

        [HttpGet("is-authenticate")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public ActionResult<UserAuthenticatedDto> checkAuthenticate() {
            var token = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            var userId = HttpContext.User.FindFirst(ClaimTypes.Name).Value;

            var user = this.userService.Get(userId);
            if (user == null) {
                return NotFound();
            }

            return Ok(new UserAuthenticatedDto {
                Id = user.Id,
                login = user.login,
                firstname = user.firstname,
                lastname = user.lastname,
                token = token
            });
        }
    }
}
