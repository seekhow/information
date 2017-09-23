var express = require('express');
var path = require('path');
var app = express();
var routes = require('./router');
var childProcess = require('child_process');
var schedule = require("node-schedule");


app.use("/public",express.static(path.join(__dirname, 'public')));
app.use("/node_modules",express.static(path.join(__dirname, 'node_modules')));
app.use(app.router);

routes(app);

// schedule.scheduleJob('30 * * * * *', function(){
//     console.log('test');
//     var update = childProcess.spawn(process.execPath, [path.resolve(__dirname, 'update/jwc/all.js')]);
//     update.stdout.pipe(process.stdout);
//     update.stderr.pipe(process.stderr);
// });

module.exports = app;
