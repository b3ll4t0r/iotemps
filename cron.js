/*
crontab format (with escaped time): *\/15 * * * *  /usr/local/bin/node /Users/scatoe/Development/projects/other/house/iotemps/cron.js
 */
require('./lib/dao').recordData();