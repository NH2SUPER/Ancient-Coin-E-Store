using Microsoft.AspNetCore.SignalR;

namespace BYDWebApi.Services
{
    public class SignalRServiceHub: Hub
    {
        private readonly IHubContext<SignalRServiceHub> _hubContext;
        public SignalRServiceHub(IHubContext<SignalRServiceHub> hubContext)
        {
            _hubContext = hubContext;
        }
        public async Task SendMessage(string message)
        {
            await _hubContext.Clients.All.SendAsync("ReceiveMessage", message);
        }
    }
}
