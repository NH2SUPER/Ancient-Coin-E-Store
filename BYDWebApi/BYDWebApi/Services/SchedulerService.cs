using System;
using BYDWebApi.Job;
using FluentScheduler;

namespace BYDWebApi.Services
{
    public class SchedulerService
    {
        public SchedulerService() { }

        public void StartScheduler(int mins)
        {
            OnlineAuction onlineAuction = new OnlineAuction();
            onlineAuction.Start();
        }
    }
}
