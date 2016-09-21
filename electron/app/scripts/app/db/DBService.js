'use strict';
angular.module('app.db', [])
  .service('DBService', ['$q', DBService]);

function DBService($q) {
  let mongoose = require('mongoose');
  let db_settings = { //DEFAULT DB SETTINGS
    user: 'user',
    password: 'password',
    server: 'ds061076.mlab.com',
    port: 61076,
    dbname: 'littlebigcourse'
  }
  let service = {};

  service.mongoose = mongoose;

  service.setDBSettings = function(db_info){
    if(db_info !== undefined)
      db_settings = db_info;
  }

  service.connect = function(db_info){
    if(db_info !== undefined)
      service.setDBSettings(db_info);
    let connString = 'mongodb://';
    if(db_settings.user && db_settings.password)
      connString += `${db_settings.user}:${db_settings.password}@`;
    connString+= `${db_settings.server}:${db_settings.port}/${db_settings.dbname}`;
    try{
      mongoose.connect(connString);
    }catch(e){
      console.log(e);
    }
  }

  service.disconnect = function(){
    try{
      mongoose.connection.close();
    }catch(e){
      console.log("fail to disconnect");
    }
  };

  return service;
}
