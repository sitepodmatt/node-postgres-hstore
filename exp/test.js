var pg = require('pg');
var hstore = require('../index'); //your code = require('node-postgres-hstore')
var path = require('path');

var conString = "tcp://" + process.env.PGUSER + ":" + 
  process.env.PGPASSWORD + "@localhost/deroku";

// SELECT oid FROM pg_type WHERE typname = 'hstore'

var hstoreOid = 74144; // different for every db

var pgTypes = require(path.join(path.dirname(require.resolve('pg')),'types'));
pgTypes.setTypeParser(hstoreOid, hstore.parse)

pg.connect(conString, function(err, client) {
  var query = client.query("SELECT 'a => b'::hstore As test");
  query.on('row', function(row) {
    console.dir(row);
  });
  query.on('end', function(row) {
    client.end();
    process.exit();
  })
});
