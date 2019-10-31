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

        public AppointmentController(ICalBookRepository gameRepository)
        {
            calBookRepo = gameRepository;
        }

        // GET: api/Game
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return new ObjectResult(await calBookRepo.GetAllAppointments());
        }

        // GET: api/Appointment/bydate/20021010
        [HttpGet("bydate/{dateCode}")]
        public async Task<IActionResult> GetAppointmentsByDate(string dateCode) {
            return new ObjectResult(await calBookRepo.GetAppointmentsByDate(dateCode));
        }

        // GET: api/Game/name
        [HttpGet("{name}", Name = "Get")]
        public async Task<IActionResult> Get(string name)
        {
            var game = await calBookRepo.GetAppointment(name);

            if (game == null)
                return new NotFoundResult();

            return new ObjectResult(game);
        }

        // POST: api/Game
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]Appointment game)
        {
            await calBookRepo.CreateAppointment(game);
            return new OkObjectResult(game);
        }

        // PUT: api/Game/5
        [HttpPut("{name}")]
        public async Task<IActionResult> Put(string name, [FromBody]Appointment game)
        {
            var gameFromDb = await calBookRepo.GetAppointment(name);

            if (gameFromDb == null)
                return new NotFoundResult();

            game.id = gameFromDb.id;

            await calBookRepo.UpdateAppointment(game);

            return new OkObjectResult(game);
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{name}")]
        public async Task<IActionResult> Delete(string name)
        {
            var gameFromDb = await calBookRepo.GetAppointment(name);

            if (gameFromDb == null)
                return new NotFoundResult();

            await calBookRepo.DeleteAppointment(name);

            return new OkResult();
        }
    }
}