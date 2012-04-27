var HB = require('../lib/honeybadger.js'),
    honeybadger = new HB({zones: ['localhost', 'root@cas.arcadia.edu']});

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
  'test from localhost to google.com': function(test) {
    test.expect(2);
    // tests here
    honeybadger.badger('google.com', function(err, results){
      
      test.equal( err, null, 'should be null.' );
      test.ok( results[0].nslookup.status, 'should properly resolve dns' );
      test.done();
    });
    
    
  }
};
