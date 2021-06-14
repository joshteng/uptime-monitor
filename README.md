# Uptime Monitor

A simple downtime monitoring and alert service for all your processes!

Great for processes and microservices that do not expose any ports or endpoints for monitoring via fabulous services Uptime Robot (free version).

## How it works
It sends a pushover notification whenever your service stops sending a pulse (see endpoint below).

This app runs a CRON like process every 10 second to check which services are down.

This is a single endpoint application that needs no configuration or set up for whatever new service or process you want to monitor. Just send a HTTP request (see endpoint below) and it will do it's magic.

## Dependencies
- Node.js (tested with v14.17.0 - left `.tool-versions` in the root of this directory)
- Sqlite3
- Pushover account

## Environment variables
```
PUSHOVER_TOKEN="" # https://pushover.net/apps/build
PUSHOVER_GROUP="" # Create subscription and a new custom group after creating app
```

## To run
```bash
npm install
npm run start
```

## Endpoint
Send a HTTP POST request to /records
```curl
curl -X POST -H "Content-Type: application/json" \
  -d '{"serviceName": "<YOUR_SERVICE_NAME>", "secondsBetweenHeartbeat": 60, "secondsBetweenAlerts": 600, "maxAlertsPerDownTime": 10}' \
  http://localhost:3000/records
```

## Endpoint Variables Defined
```
serviceName -> A unique name to identify your process
secondsBetweenHeartbeat -> How many seconds before you receive the first alert when your process goes down. Generally, this should also be the same as how often your process sends a ping
secondsBetweenAlerts -> When the second alert gets out if process still not sending a ping after first alert. This to avoid it getting spammy and annoying.
maxAlertsPerDownTime -> Number of alerts per down time session before it stops sending you an alert. This will help prevent annoying you for forgetting to delete the service from the database.
```

## Security
Feel free to implement your own basic auth or whatever. I operate this in a controlled private network environment.

## Reliability
Won't it be bad if your uptime monitor goes down instead of your app?

Typical production deployment practices will help prevent that from happening. Or you could deploy a new instance of this app for every instance of this app you deploy. ;p

Tips
1. Use PM2
1. Use something like systemd (systemctl) if on Ubuntu and I think other Debian flavored distros
1. And of course your actual server uptime matters.

## Improvements Needed
1. Send back friendly errors if the single endpoint request failed
2. Use upsert instead of select + insert / update whenever a new request arrives
2. Testing

## Disclaimer
As per usual, use at your own discretion especially when using to monitor billion dollar processes.

I've no plans to maintain this publicly for now. Feel free to clone, contribute or whatever tickles your fancy.
