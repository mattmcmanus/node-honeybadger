  //   Required Modules
var _ = require('underscore');

var httpTest = module.exports = function(test, next) {
  var results = {
        status: true,
        statusCode: null
      },
      exec = require('child_process').exec,
      curl;

  var cmd = 'curl -sL -w \'%{http_code}\' '+test.hostname+' -o /dev/null';
  
  if (test.zone !== 'localhost') {
    cmd = 'ssh '+ test.zone + ' ' + cmd;
  }

  // curl -sL -w '%{http_code}\n' http://www.google.com -o /dev/null
  curl = exec( cmd, function(error, stdout, stderr){
    if ( error !== null ) {
      console.log('exec error: ' + error); 
      results.status = false;
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