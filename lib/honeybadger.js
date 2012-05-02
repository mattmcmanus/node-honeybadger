/*
 * honeybadger
 * https://github.com/mattmcmanus/honeybadger
 *
 * Copyright (c) 2012 Matt McManus
 * Licensed under the MIT license.
 */
     //   Required Modules
 var async = require('async'),
     _ = require('underscore');

var zoneTest = function(test, next) {
  async.parallel([
    function(next){
      require('./nslookup')( test, next );
    },
    function(next){
      require('./curl')( test, next );
    }
  ],
  // The results
  function(err, results){
    results = { zone: test.zone, nslookup: results[0].nslookup, curl: results[1].curl };
    next(err, results);
  });
};

//                    Honeybadger Setup
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// options = {
//   hostname: '',
//   username: '',
//   alias: ''
// }

var HB = module.exports = function honeybadger ( options ) {
  // Setup options if none were supplied
  if (!options) { options = { hostname: 'localhost' }; }

  this.zones = options;
};

//                  Badger the hostname
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
HB.prototype.badger = function(hostname, next) {

  if ( !hostname ) { return next('You did not supply a hostname to test'); }

  if ( !/^[A-Za-z0-9-_%&\?\/.=]+$/.test(hostname) ) { return next('You did not supply a valid hostname'); }

  var tests = _.map( this.zones, function(test){ return { 'zone': test, 'hostname': hostname }; });

  async.concat(tests, zoneTest, function(err, results){
    next(err, results);
  });

};