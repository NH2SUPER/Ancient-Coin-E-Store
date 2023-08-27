using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.Xml.Linq;
using FluentScheduler;
using Microsoft.AspNetCore.SignalR;

namespace BYDWebApi.Job
{
    public class OnlineAuctionJob : IJob
    {
        public void Execute()
        {
            SendMessageAsync();
            Console.WriteLine("Hello, world!");
        }

        public async Task<string> SendMessageAsync()
        {
            //var content = new FormUrlEncodedContent(new[] { new KeyValuePair<string, string>("message", "call by me") });
            HttpClient _httpClient = new HttpClient { BaseAddress = new Uri("https://localhost:7084") };
            var response = await _httpClient.PostAsync("/api/Scheduler/SendMessage?message=50", null);
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadAsStringAsync();
        }
    }

    public class SchedulerRegistry : Registry
    {
        public SchedulerRegistry()
        {
            Schedule<OnlineAuctionJob>().ToRunEvery(1).Minutes();
        }
    }

    public class OnlineAuction
    {
        public void Start()
        {
            JobManager.Initialize(new SchedulerRegistry());
        }
    }
}
