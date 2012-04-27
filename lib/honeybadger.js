/*
 * honeybadger
 * https://github.com/mattmcmanus/honeybadger
 *
 * Copyright (c) 2012 Matt McManus
 * Licensed under the MIT license.
 */
     //   Required Modules
 var async = require('async'),
     request = require('request'),
     lazy = require('lazy'),
     _ = require('underscore');


var zoneTest = function(test, next) {
  var results = {
        status: true,
        nslookup: {
          status: true,
          ips: []
        }
      },
      exec = require('child_process').exec,
      ping;

  ping = exec( 'nslookup '+test.hostname, function(error, stdout, stderr){
    if (error !== null) { console.log('exec error: ' + error); }
    var lines = stdout.trim().split(/\n/g);

    if (lines[0].substr(0,20) === '* server can\'t find') { // If it can't resolve the hostname, throw error
      results.nslookup.status = false;

    } else {
      _.each(lines, function(line, num) {
        if (num > 1) { // Skip the headers
          var words = line.split(/\s/g);

          if (words[0] === 'Address:') {
            results.nslookup.ips.push(words[1]);
          }
        }
      });
    }
    next(null, results);
  });
};


var HB = module.exports = function honeybadger ( options ) {
  // Setup options if none were supplied
  if (!options) { options = {}; }

  this.zones = (options.zones) ? options.zones : ['localhost'];
};

HB.prototype.badger = function(hostname, next) {

  var tests = this.zones;
  
  tests = _.map( tests, function(test){ return { 'zone': test, 'hostname': hostname }; });

  async.concat(tests, zoneTest, function(err, results){
    next(err, results);
  });
  
  // request({uri:service.url, onResponse:true}, function (error, response, body) {
  //   if (error) {
  //     response.statusCode = 500
  //   }
  //   response
  // })
      
};