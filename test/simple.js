var hstore = require('../index');
var assert = require('assert');
var deepEquals = require('underscore').isEqual;

describe('hstore parsing and serialization', function() {
  
  it('should stringify and parse correctly', function() {

    var payload = {
      name: 'Matt Freeman',
      age: 29,
      bio: "With a nested double quote \"",
      bio2: "With two \" nested double quote \"",
      isSane: true, 
      isMental: false,
      job: null
    };

    // Pre-emption: WTF? expected is different?
    // See readme.md, hstore is for storing string-string values with exception
    // of null value. Unless you start creating your own serialization format
    // for booleans/numbers/etc you dont know at output weather 'true' is 
    // 'true' string or true boolean. So we dont complicate things here, if your
    // running into this look at JSON type in postgres 9.2 instead.
    var expected = {
      name: 'Matt Freeman',
      age: '29',
      bio: "With a nested double quote \"",
      bio2: "With two \" nested double quote \"",
      isSane: 'true',  
      isMental: 'false',
      job: null
    };

    var strPayload = hstore.stringify(payload);
    var deserializedPayload = hstore.parse(strPayload);

    assert.ok(deepEquals(deserializedPayload, expected))
  });

});
