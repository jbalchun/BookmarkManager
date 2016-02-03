var cluster = require('cluster');

/*
* Basic node server w/ some extra code to utilize all 4 cores on the heroku dyno
*
* */
if (cluster.isMaster) {
  // Count the machine's CPUs
  var cpuCount = require('os').cpus().length;

  // Create a worker for each CPU
  for (var i = 0; i < cpuCount; i += 1) {
    cluster.fork();
  }

  var express = require('express'),
    app = express();
  app.use(express.static('www'));
  app.set('port', process.env.PORT || 5000);
  app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
  });
}
