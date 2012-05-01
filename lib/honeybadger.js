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
  // optional callback
  function(err, results){
    results = { zone: test.zone, nslookup: results[0].nslookup, curl: results[1].curl };
    next(err, results);
  });
};

//                    Honeybadger Setup
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var HB = module.exports = function honeybadger ( options ) {
  // Setup options if none were supplied
  if (!options) { options = {}; }

  this.zones = (options.zones) ? options.zones : ['localhost'];
};

//                  Badger the hostname
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
HB.prototype.badger = function(hostname, next) {

  var tests = _.map( this.zones, function(test){ return { 'zone': test, 'hostname': hostname }; });

  async.concat(tests, zoneTest, function(err, results){
    next(err, results);
  });

};