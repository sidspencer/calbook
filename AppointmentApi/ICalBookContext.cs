using MongoDB.Driver;

namespace CalBookApi
{
    public interface ICalBookContext
    {
        IMongoCollection<Appointment> Appointments { get; }
    }
}