  //   Required Modules
var _ = require('underscore');

var nslookupTest = module.exports = function(test, next) {
  var results = {
        status: true,
        ips: []
      },
      exec = require('child_process').exec,
      zone = '',
      nslookup;

  if (test.zone !== 'localhost') {
    zone = 'ssh '+ test.zone + ' ';
  }

  nslookup = exec( zone+'nslookup '+test.hostname, function(error, stdout, stderr){
    if (error !== null) { console.log('exec error: ' + error); return next(error); }
    var lines = stdout.trim().split(/\n/g);

    if (lines[0].substr(0,20) === '* server can\'t find') { // If it can't resolve the hostname, throw error
      results.status = false;

    } else {
      _.each(lines, function(line, num) {
        if (num > 1) { // Skip the headers
          var words = line.split(/\s/g);

          if (words[0] === 'Address:') {
            results.ips.push(words[1]);
          }
        }
      });
    }
    next(null, { nslookup: results });
  });
};