var HB = require('../lib/honeybadger.js'),
    honeybadger = new HB( [{ hostname: 'localhost', username: 'root' }, { hostname: 'cas.arcadia.edu', username: 'root', alias: 'external' }] );

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports['honeybadger'] = {
  setUp: function(done) {
    done();
  },
  'test from localhost to nowhere': function(test) {
    test.expect(1);
    honeybadger.badger(null, function(err, results){
      test.equal( err, 'You did not supply a hostname to test', 'should yell at you for not supplying a hostname to test' );
      test.done();
    });
  },
  'test from localhost to invalid hostname': function(test) {
    test.expect(1);
    honeybadger.badger('google.com;ls', function(err, results){
      test.equal( err, 'You did not supply a valid hostname', 'should yell at you for not supplying a valid hostname' );
      test.done();
    });
  },
  'test from localhost to google.com': function(test) {
    test.expect(3);
    honeybadger.badger('www.google.com', function(err, results){
      test.equal( err, null, 'error should be null.' );
      test.ok( results[0].nslookup.status, 'should properly resolve dns' );
      test.ok( results[0].curl.status, 'should properly retrieve status code' );
      test.done();
    });
  },
  'test from localhost to dwajiodwa.com': function(test) {
    test.expect(3);
    honeybadger.badger('dwajiodwa.com', function(err, results){
      test.ok( err, 'test should throw an error' );
      test.ok( !results[0].nslookup.status, 'should NOT resolve dns' );
      test.ok( !results[0].curl.status, 'should properly retrieve status code' );
      test.done();
    });
  }
};
