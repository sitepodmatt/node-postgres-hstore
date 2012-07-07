var pg = require('pg');
var hstore = require('../index'); //your code = require('node-postgres-hstore')
var path = require('path');

var conString = "tcp://" + process.env.PGUSER + ":" + 
  process.env.PGPASSWORD + "@localhost/deroku";

// SELECT oid FROM pg_type WHERE typname = 'hstore'

var hstoreOid = 74144; // different for every db

var pgTypes = require(path.join(path.dirname(require.resolve('pg')),'types'));
pgTypes.setTypeParser(hstoreOid, hstore.parse)

var payload = {
  a: 1,
  b: true,
  c: false,
  d: null,
  e: "Matt single' quote",
  f: "Matt double quote\" ",
  g: "/usr/local/bin",
  h: "c:\\windozes\\mshell\\killme"
};

console.log(payload.h)

pg.connect(conString, function(err, client) {
  var query = client.query("SELECT $1::hstore As test", [hstore.stringify(payload)]);
  query.on('row', function(row) {
    console.log(row.test.d)
    console.log(row.test.e)
    console.log(row.test.f)
    console.log(row.test.g)
    console.log(row.test.h)
  });
  query.on('end', function(row) {
    client.end();
    process.exit();
  })
});
