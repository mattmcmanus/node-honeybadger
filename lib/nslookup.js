  //   Required Modules
var _ = require('underscore'),
    util = require('./util');

var nslookupTest = module.exports = function(test, next) {
  var results = {
        status: true,
        ips: []
      },
      exec = require('child_process').exec,
      nslookup;
      
  // Build the command
  var cmd = util.prefix(test.zone) + 'nslookup ' + test.hostname.hostname;

  // Run the nslookup command
  nslookup = exec( cmd, function(error, stdout, stderr){
    // If there is an error, exit
    if (error !== null) { console.log('exec error: ' + error); return next(error); }
    
    // Split the lines into an array
    var lines = stdout.trim().split(/\n/g);

    if (lines[3].substr(0,13) === '** server can') { // If it can't resolve the hostname, throw error
      results.status = false;
      results.error = lines[3].substr(3);
      results.cmd = cmd;
    } else {
      _.each(lines, function(line, num) {
        if (num > 1) { // Skip the headers
          // Split words into an array
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