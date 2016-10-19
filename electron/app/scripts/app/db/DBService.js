'use strict';
angular.module('app.db', [])
  .service('DBService', ['$q', DBService]);

function DBService($q) {
  let mongoose = require('mongoose');
  let db_settings = { //DEFAULT DB SETTINGS
    server: '200.145.148.251',
    port: 27017,
    dbname: 'meancourse'
  }
  let service = {};

  service.mongoose = mongoose;

  service.setDBSettings = function(db_info){
    if(db_info !== undefined)
      db_settings = db_info;
  }

  service.connect = function(db_info){
    if(db_info !== undefined) // Atualizando os dados de conexão do banco de dados
      service.setDBSettings(db_info);
    let connString = 'mongodb://';
    if(db_settings.user && db_settings.password)
      connString += `${db_settings.user}:${db_settings.password}@`;
    connString+= `${db_settings.server}:${db_settings.port}/${db_settings.dbname}`;
    try{
      mongoose.connect(connString); // Criando conexão
    }catch(e){
      console.log(e);
    }
  }

  service.disconnect = function(){
    try{
      mongoose.connection.close(); // Fechando conexão
    }catch(e){
      console.log(`can't disconnect`);
    }
  };

  return service; // Exportando a service
}
