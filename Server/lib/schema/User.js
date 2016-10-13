'use strict';
const xablau = require('xablaujs');

// Schemas do Mongoose http://mongoosejs.com/docs/guide.html
return xablau.Schema({
  name: String,
  role: String,
  picture: String,
  description: String
});
