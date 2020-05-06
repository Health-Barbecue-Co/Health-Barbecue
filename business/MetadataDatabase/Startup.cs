using System;
using MetadataDatabase.Repository;
using MetadataDatabase.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using MetadataDatabase.Models;
using System.Reflection;
using System.IO;
using MetadataDatabase.framework.DAL;


using AutoMapper;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Text;
using System.Threading.Tasks;

namespace MetadataDatabase
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            RegisterIocContainer(services);

            // Configure the JWT Authentication Service
            var authSettings = Configuration.GetSection(nameof(AuthConfiguration)).Get<AuthConfiguration>();
            var key = Encoding.ASCII.GetBytes(authSettings.Secret);

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(jwtOptions =>
            {
                jwtOptions.Events = new JwtBearerEvents
                {
                    OnTokenValidated = context =>
                    {
                        var userService = context.HttpContext.RequestServices.GetRequiredService<IUserServices>();
                        var userId = context.Principal.Identity.Name;
                        var user = userService.Get(userId);
                        if (user == null)
                        {
                            // return unauthorized if user no longer exists
                            context.Fail("Unauthorized");
                        }
                        return Task.CompletedTask;
                    }
                };
                jwtOptions.RequireHttpsMetadata = false;
                jwtOptions.SaveToken = true;
                jwtOptions.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });

            // add suport for swagger
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Health Barbecue API", Version = "v1" });
                // Set the comments path for the Swagger JSON and UI.
                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                c.IncludeXmlComments(xmlPath);
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Health Barbecue API V1");
            });

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        /// <summary>
        /// Register here your services for the Dependancy Injection.
        /// </summary>
        /// <param name="service"></param>
        private void RegisterIocContainer(IServiceCollection service)
        {
            service.Configure<MongoConfiguration>(Configuration.GetSection(nameof(MongoConfiguration)));
            service.Configure<PacsConfiguration>(Configuration.GetSection(nameof(PacsConfiguration)));
            service.Configure<AuthConfiguration>(Configuration.GetSection(nameof(AuthConfiguration)));
            service.Configure<AlgoConfiguration>(Configuration.GetSection(nameof(AlgoConfiguration)));

            service.AddScoped<ISeriesServices, SeriesServices>();
            service.AddScoped<ISeriesRepository, SeriesRepository>();

            service.AddScoped<IUserServices, UserServices>();
            service.AddScoped<IUserRepository, UserRepository>();

            service.AddScoped<IPacsService, PacsService>();
            service.AddScoped<IPacsMirrorService, PacsMirrorService>();

            service.AddScoped<ILabelRepository, LabelRepository>();
            service.AddScoped<ILabelService, LabelService>();

            service.AddScoped<IAlgosRepository, AlgosRepository>();
            service.AddScoped<IAlgoService, AlgoService>();
        }
    }
}
