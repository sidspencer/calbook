using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Driver;

namespace CalBookApi
{
    public class CalBookRepository : ICalBookRepository
    {
        private readonly ICalBookContext _context;

        public CalBookRepository(ICalBookContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Appointment>> GetAllAppointments()
        {
            return await _context
                            .Appointments
                            .Find(_ => true)
                            .ToListAsync();
        }

        public Task<Appointment> GetAppointment(ObjectId id)
        {
            FilterDefinition<Appointment> filter = Builders<Appointment>.Filter.Eq(m => m.id, id);

            return _context
                    .Appointments
                    .Find(filter)
                    .FirstOrDefaultAsync();
        }
       
        public async Task CreateAppointment(Appointment appointment)
        {
            await _context.Appointments.InsertOneAsync(appointment);
        }

        public async Task<bool> UpdateAppointment(Appointment appointment)
        {
            ReplaceOneResult updateResult =
                await _context
                        .Appointments
                        .ReplaceOneAsync(
                            filter: g => g.id == appointment.id,
                            replacement: appointment);

            return updateResult.IsAcknowledged
                    && updateResult.ModifiedCount > 0;
        }

        public async Task<bool> DeleteAppointment(ObjectId id)
        {
            FilterDefinition<Appointment> filter = Builders<Appointment>.Filter.Eq(m => m.id, id);

            DeleteResult deleteResult = await _context
                                                .Appointments
                                                .DeleteOneAsync(filter);

            return deleteResult.IsAcknowledged
                && deleteResult.DeletedCount > 0;
        }

        public async Task<IEnumerable<Appointment>> GetAppointmentsByDate(string dateCode) {
            CalDate cd = new CalDate(dateCode);
            var f2 = "{ $and: [{\"calDate.yyyy\": " + cd.yyyy + " }, {\"calDate.mm\": " + cd.mm + "}, {\"calDate.dd\": " + cd.dd + "}] }";

            return await _context
                    .Appointments
                    .Find(f2)
                    .ToListAsync();
        }

    }
}