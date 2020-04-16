using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MetadataDatabase.Repository;
using MetadataDatabase.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using Microsoft.Extensions.Options;
using MetadataDatabase.Models;
using System.Reflection;
using System.IO;
using MetadataDatabase.framework.DAL;

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
            services.Configure<PacsSettings>(
                Configuration.GetSection(nameof(PacsSettings)));
            services.AddSingleton<PacsSettings>(sp =>
                sp.GetRequiredService<IOptions<PacsSettings>>().Value);

            services.AddControllers();
            RegisterIocContainer(services);

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
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IPacsMirrorServices pacsMirrorServices)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            pacsMirrorServices.CheckForUpdates();

            // app.UseHttpsRedirection();

            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Health Barbecue API V1");
            });

            app.UseRouting();

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
            service.Configure<MongoConfiguration>(Configuration.GetSection("MongoConfiguration"));

            service.AddScoped<ISeriesServices, SeriesServices>();
            service.AddScoped<ISeriesRepository, SeriesRepository>();
            service.AddScoped<IPacsServices, PacsServices>();
            service.AddScoped<IPacsMirrorServices, PacsMirrorServices>();
        }
    }
}
