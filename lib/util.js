
// Build the command prefix to run
exports.prefix = function( zone ){
  var prefix = '', user = '';

  if ( zone.username ) {
    user = zone.username+'@';
  }
  
  if (zone.hostname !== 'localhost') {
    prefix = 'ssh ' + user + zone.hostname + ' ';
  }

  return prefix;
};