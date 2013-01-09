require('sugar');
var util = require('util');

// HACK: ...until Node.js `require` supports `instanceof` on modules loaded more than once. (bug in Node.js)
var Serializer = global.NodeDocumentSerializer || (global.NodeDocumentSerializer = require('node-document-serializer'));

// -----------------------
//  DOCS
// --------------------
//  - http://msgpack.org
//  - https://github.com/pgriess/node-msgpack

// -----------------------
//  Constructor
// --------------------

// new MessagePack ()
// new MessagePack (options)
function MessagePack () {
  var self = this

  self.klass = MessagePack;
  self.klass.super_.apply(self, arguments);

  self.engine = require('msgpack');
  self.binary = true;
}

util.inherits(MessagePack, Serializer);

// -----------------------
//  Class
// --------------------

MessagePack.defaults = {
  options: {}
};

MessagePack.options = Object.clone(MessagePack.defaults.options, true);

MessagePack.reset = Serializer.reset;

// -----------------------
//  Instance
// --------------------

// #serialize (object)
MessagePack.prototype.serialize = function(object) {
  var self = this, data;

  try {
    data = self.engine.pack(object);
  } catch (err) {
    err.name = "Serialization: " + err.name;
    err.message = err.message + "  =>  " + util.inspect(data);
    throw err;
  }

  return data;
};

// #deserialize (data)
MessagePack.prototype.deserialize = function(data) {
  var self = this, object;

  try {
    object = self.engine.unpack(data);
  } catch (err) {
    err.name = "Deserialization: " + err.name;
    err.message = err.message + "  =>  " + util.inspect(data);
    throw err;
  }

  return object;
}

// -----------------------
//  Export
// --------------------

module.exports = MessagePack;
