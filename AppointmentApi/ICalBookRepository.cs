using System.Collections.Generic;
using System.Threading.Tasks;

namespace CalBookApi
{
    public interface ICalBookRepository
    {
        Task<IEnumerable<Appointment>> GetAllAppointments();
        Task<IEnumerable<Appointment>> GetAppointmentsByDate(string dateCode);
        Task<Appointment> GetAppointment(string name);
        Task CreateAppointment(Appointment game);
        Task<bool> UpdateAppointment(Appointment game);
        Task<bool> DeleteAppointment(string name);
    }
}