using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Bson;

namespace CalBookApi
{
    public interface ICalBookRepository
    {
        Task<IEnumerable<Appointment>> GetAllAppointments();
        Task<IEnumerable<Appointment>> GetAppointmentsByDate(string dateCode);
        Task<Appointment> GetAppointment(string id);
        Task CreateAppointment(Appointment appointment);
        Task<bool> UpdateAppointment(Appointment appointment);
        Task<bool> DeleteAppointment(string id);
    }
}