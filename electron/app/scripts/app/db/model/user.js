(function(){
  'use strict';
  const mongoose = require('mongoose');

  // Schemas do Mongoose http://mongoosejs.com/docs/guide.html
  const User = mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    role: String,
    picture: String,
    description: String
  });

  window.User = mongoose.model("user", User);
})()
