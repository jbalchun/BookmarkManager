var cluster = require('cluster');

//clustering to run 4 threads on one heroku dyno
if (cluster.isMaster) {
  // Count the machine's CPUs
  var cpuCount = require('os').cpus().length;

  // Create a worker for each CPU
  for (var i = 0; i < cpuCount; i += 1) {
    cluster.fork();
  }

  var express = require('express'),
    app = express();
  //gulp.start('templates');
  app.use(express.static('www'));
  app.set('port', process.env.PORT || 5000);
  app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
  });
}
