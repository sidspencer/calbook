using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Bson.Serialization;

namespace CalBookApi {

    public class CalBookContext : ICalBookContext
    {
        private readonly IMongoDatabase _db;

        public CalBookContext(IOptions<Settings> options, IMongoClient client)
        {
            _db = client.GetDatabase(options.Value.Database);
        }

        public IMongoCollection<Appointment> Appointments => _db.GetCollection<Appointment>("Appointment");
    }
}