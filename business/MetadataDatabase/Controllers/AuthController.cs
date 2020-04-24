using System;
using MetadataDatabase.Data;
using MetadataDatabase.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MetadataDatabase.Models;

using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Options;
using System.Text;

namespace MetadataDatabase.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private IUserServices userService;
        private IMapper mapper;
        private readonly AuthConfiguration settings;
				private readonly SymmetricSecurityKey signinKey;


        public AuthController(IUserServices userService, IMapper mapper, IOptions<AuthConfiguration> settings)
        {
            this.userService = userService;
            this.mapper = mapper;
            this.settings = settings.Value;
						this.signinKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(this.settings.Secret));
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public ActionResult<UserAuthenticatedDto> Authenticate([FromBody] Authenticate model)
        {
            var user = this.userService.Authenticate(model.Username, model.Password);

            if (user == null) {
                return BadRequest(new { message = "Username or password is incorrect" });
						}

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(this.settings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            // return basic user info and authentication token
            return Ok(new UserAuthenticatedDto
            {
                Id = user.Id,
                login = user.login,
                firstname = user.firstname,
                lastname = user.lastname,
                token = tokenString
            });
        }

				[AllowAnonymous]
				[HttpGet("Token/{username}/{password}")]
				public IActionResult GetToken(string username, string password)
				{
						if (username == password)
								return new ObjectResult(GenerateToken(username));
						else
								return BadRequest();
				}

				// Generate a Token with expiration date and Claim meta-data.
				// And sign the token with the signinKey
				private string GenerateToken(string username)
				{
						var token = new JwtSecurityToken(
								claims:    new Claim[] { new Claim(ClaimTypes.Name, username) },
								notBefore: new DateTimeOffset(DateTime.Now).DateTime,
								expires:   new DateTimeOffset(DateTime.Now.AddMinutes(60)).DateTime,
								signingCredentials: new SigningCredentials(signinKey, SecurityAlgorithms.HmacSha256)
								);

						return new JwtSecurityTokenHandler().WriteToken(token);
				}
    }
}