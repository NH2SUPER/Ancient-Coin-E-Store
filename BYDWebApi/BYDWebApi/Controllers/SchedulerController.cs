using BYDWebApi.DTO;
using BYDWebApi.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System.Xml.Linq;

namespace BYDWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SchedulerController : ControllerBase
    {
        private readonly IHubContext<BYDWebApi.Services.SignalRServiceHub> _hubContext;
        public SchedulerController(IHubContext<BYDWebApi.Services.SignalRServiceHub> hubContext) {
            _hubContext = hubContext;
        }

        [HttpPost(Name = "StartScheduler")]
        public void StartScheduler(int mins)
        {
            SchedulerService schedulerService = new SchedulerService();
            schedulerService.StartScheduler(mins);
        }

        [HttpPost("SendMessage")]
        public async Task<IActionResult> SendMessage(string message)
        {
            await _hubContext.Clients.All.SendAsync("ReceiveMessage", message);
            return Ok();
        }
    }
}
