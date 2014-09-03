module.exports.parse = function(val) {

  var pattern, re, result, match, key, value;

  pattern = '("(?:\\\\\"|[^"])*?")\\s*=>\\s*((?:"(?:\\\\\"|[^"])*?")|NULL)';
  re = new RegExp(pattern,'gi');
 
  result = {};
  match = null;

  while((match = re.exec(val)) != null) {
    key = JSON.parse(match[1]);
    value = match[2] == "NULL" ? null : JSON.parse(match[2]);
    result[key] = value;
  }

  return result;

}

module.exports.stringify = function(val) {

  var result = Object.keys(val).map(function(key) {
    var value = val[key];
    value = value === null ? 'NULL' : JSON.stringify(value.toString());
    return '"' + key + '" => ' + value;
  }).join(', ') || 'hstore(array[]::varchar[])';

  return result;

}
