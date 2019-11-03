using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace CalBookApi
{
    [Produces("application/json")]
    [Route("api/appointment")]
    public class AppointmentController : Controller
    {
        private readonly ICalBookRepository calBookRepo;

        public AppointmentController(ICalBookRepository calBookRepository)
        {
            calBookRepo = calBookRepository;
        }

        // GET: api/Appointment
        [HttpGet()]
        public async Task<IActionResult> Get()
        {
            return new ObjectResult(await calBookRepo.GetAllAppointments());
        }

        // GET: api/Appointment/bydate/20021010
        [HttpGet("bydate/{dateCode}")]
        public async Task<IActionResult> GetAppointmentsByDate(string dateCode) {
            return new ObjectResult(await calBookRepo.GetAppointmentsByDate(dateCode));
        }

        // GET: api/appointment/name
        [HttpGet("{id}", Name = "Get")]
        public async Task<IActionResult> Get(string id)
        {
            var appointment = await calBookRepo.GetAppointment(id);

            if (appointment == null)
                return new NotFoundResult();

            return new ObjectResult(appointment);
        }

        // PUT: api/appointment/
        [HttpPut()]
        public async Task<IActionResult> Put([FromBody]Appointment appointment)
        {
            appointment.Id = ObjectId.Empty.ToString();
            await calBookRepo.CreateAppointment(appointment);
            return new OkObjectResult(appointment);
        }

        // POST: api/appointment/
        [HttpPost()]
        public async Task<IActionResult> Post([FromBody]Appointment appointment)
        {
            await calBookRepo.UpdateAppointment(appointment);
            return new OkObjectResult(appointment);
        }

        // DELETE: api/Appointment/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var appointmentFromDb = await calBookRepo.GetAppointment(id);

            if (appointmentFromDb == null)
                return new NotFoundResult();

            await calBookRepo.DeleteAppointment(id);

            return new OkResult();
        }
    }
}