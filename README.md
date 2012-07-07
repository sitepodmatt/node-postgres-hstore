node-postgres-hstore
======

Provides basic hstore parsing and stringify methods (stringify / parse) for 
use with hstore datatype in postgres 9.0+. Intended to be used with 
node-postgres

integration
=======

parser:
there doesnt seem to be a clean hook point, the FAQ refers to a test that 
includes the pgtypes file via a relative path, I couldnt see anything on the
primary pg object that we could use, so path hacking it is.

A simple example of what you may have to do (see exp/test.js):

``
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
``

serialization:
node-postgres doesnt have any extensions point for serialization, so you have to
do this in your own layers, although it looks like it may come soon [query.js#L130](https://github.com/brianc/node-postgres/blob/master/lib/query.js#L130)

``
var hstore = require('node-postgres-hstore');
var strOutput = hstore.stringify(payload);
``

future
=======

As of accb94b (07/07/12) the unit tests are failing, I suspect this is part of an
overhaul as they target node v0.8.x. I will revisit once things have stablized
again and attempt to expose a clean way to register parser, a way to register
serializers, and possibly an explicit method to collect up the metadata for 
custom types (needs some though as we dont want to invisibly be hitting the db).

install
=======

cd projectdir  
npm install --save node-postgres-hstore

tests
=======
See test/simple.js  
git clone repo  
npm install --dev .  
npm test  

license
=======
The MIT License

author
=======
[Twitter - @nonuby](http://www.twitter.com/nonuby)  
[Nonuby Blog](http://blog.nonuby.com/) 

