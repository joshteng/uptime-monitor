module.exports = {
  "type": "sqlite",
  "database": "./uptime-monitor.sql",
  "entities": ["dist/**/*.entity{.ts,.js}"],
  "synchronize": true,
  "logging": true
}
