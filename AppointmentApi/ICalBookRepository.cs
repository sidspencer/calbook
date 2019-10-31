using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Bson;

namespace CalBookApi
{
    public interface ICalBookRepository
    {
        Task<IEnumerable<Appointment>> GetAllAppointments();
        Task<IEnumerable<Appointment>> GetAppointmentsByDate(string dateCode);
        Task<Appointment> GetAppointment(ObjectId name);
        Task CreateAppointment(Appointment game);
        Task<bool> UpdateAppointment(Appointment game);
        Task<bool> DeleteAppointment(ObjectId name);
    }
}