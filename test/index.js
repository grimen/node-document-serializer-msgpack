
var Serializer = require('node-document-serializer');

module.exports = Serializer.Spec('MsgPack', {
  module: require('..'),
  engine: require('msgpack'),
  options: {},
  pack: require('msgpack').pack,
  unpack: require('msgpack').unpack,
  binary: true
});
