# node-honeybadger

[![Greenkeeper badge](https://badges.greenkeeper.io/mattmcmanus/node-honeybadger.svg)](https://greenkeeper.io/)

Honeybadger is a network diagnostic tool that makes it easy to test DNS and firewall configurations across multiple networks and subnets. 

## Getting Started
Install the module with: `npm install honeybadger`

```javascript
var HB = require('honeybadger'),
    honeybadger = new HB( [{ hostname: 'localhost', alias: 'internal' }, { hostname: 'different.subnet.com', username: 'root', alias: 'external' }] );

honeybadger.badger('www.google.com', function(err, results){
  console.log(results)
});
```

## Documentation

### Creating a new honeybadger instance


```javascript
var HB = require('honeybadger'),
    honeybadger = new HB( [{ hostname: 'localhost', alias: 'internal' }, { hostname: 'different.subnet.com', username: 'root', alias: 'external' }] );
```

## Examples
_(Coming soon)_

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt](https://github.com/cowboy/grunt).

## Release History
* **5/2/2012** First public release

## License
Copyright (c) 2012 Matt McManus  
Licensed under the MIT license.
