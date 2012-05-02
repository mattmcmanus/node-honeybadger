  //   Required Modules
var _ = require('underscore'),
    util = require('./util');

var httpTest = module.exports = function(test, next) {
  var results = {
        status: true,
        statusCode: null
      },
      exec = require('child_process').exec,
      curl;

  // Build the cmd
  var cmd = util.prefix(test.zone) + 'curl -sL -w \'%{http_code}\' '+test.hostname+' -o /dev/null';

  // curl -sL -w '%{http_code}\n' http://www.google.com -o /dev/null
  curl = exec( cmd, function(error, stdout, stderr){
    if ( error !== null ) {
      results.status = false;

      if (error.code == 6) {
        error = "Couldn't resolve host. The given remote host was not resolved."
      } else if (error.code == 7) {
        error = "Failed to connect() to host or proxy. Most likely port 80 is blocked"
      }

      results.error = error;
    } else if ( stderr ) {
      results.status = false;
      results.error = stderr;
    } else {
      results.statusCode = stdout.trim();
    }

    next( error, { curl: results } );
  });

};