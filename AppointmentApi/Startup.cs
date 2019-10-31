using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;


namespace CalBookApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        const string CorsOptsName = "Allow_All";

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<Settings>(
            options =>
            {
                options.ConnectionString = Configuration.GetSection("MongoDB:ConnectionString").Value;
                options.Database = Configuration.GetSection("MongoDB:Database").Value;
            });

            services.AddCors(options =>
            {
                options.AddPolicy(CorsOptsName,
                builder =>
                {
                    builder.AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowAnyMethod();
                });
            });

            services.AddSingleton<IMongoClient, MongoClient>(
                _ => new MongoClient(Configuration.GetSection("MongoDB:ConnectionString").Value));

            services.AddTransient<ICalBookContext, CalBookContext>();
            services.AddTransient<ICalBookRepository, CalBookRepository>();

            services.AddControllers();
            
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors(CorsOptsName);

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }

    public class Settings {
        public string ConnectionString { get; set; }
        public string Database { get; set; }    
    }
}
