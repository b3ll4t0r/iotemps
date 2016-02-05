/*
crontab format (with escaped time): *\/15 * * * *  /usr/local/bin/node /Users/scatoe/Development/projects/other/house/iotemps/cron.js
 */
var dao = require('./lib/dao');

dao.recordData();

console.log('Done');
