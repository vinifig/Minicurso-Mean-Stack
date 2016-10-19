(function(){
  'use strict'
  const mongoose = require('mongoose');

  const User = mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    role: String,
    picture: String,
    description: String
  });

  window.User = mongoose.model('user', User);
})();
