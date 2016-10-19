(function(){
  'use strict';
  angular.module('app.db')
    .service('UserService', ['DBService', '$q', UserService]);

  function UserService(DBService, $q) { // Nossa service de conexão com o bd, e um módulo para criação de promises.
    let service = {};

    service.setDBSettings = DBService.setDBSettings; // Tornando público as configurações do banco de dados

    // Find Users

    service.getAll = function(){ // Retorna todos os Users do BD
      return service.find({});
    }

    service.find = function(search){ // Retorna todos os User do BD que batem com os parametros
      let deferred = $q.defer();
      DBService.connect(); // Conecta com o banco de dados
      User.find(search, function(err, items){
        DBService.disconnect(); // Assim que terminar de mexer com o BD, feche a conexão por motivos de segurança e para não sobrecarregar seu SGBD
        if(err)
          return deferred.reject(err); // Em caso de erro, manda uma falha para a promise
        return deferred.resolve(items); // Em caso de sucesso, resolve a promessa com os dados obtidos.
      })
      return deferred.promise; // Retorna a promise para trabalhar em cima
    }

    service.getOne = function(search){ // Retorna apenas um User do BD que bata com os parametros passados
      let deferred = $q.defer();
      DBService.connect();
      User.findOne(search, function(err, item){
        DBService.disconnect();
        if(err)
          return deferred.reject(err);
        return deferred.resolve(item);
      })
      return deferred.promise;
    }

    // Insert User

    service.insert = function(user_data){ // Insere um usuário no bd.
      let deferred = $q.defer();
      DBService.connect();
      let user = new User(user_data); // Cria um Usuário
      user.save((err) => { // Insere ele no banco de dados
        DBService.disconnect();
        if(err)
          return deferred.reject(err);
        return deferred.resolve(user_data);
      })
      return deferred.promise;
    }

    // Edit User
    service.update = function(user_data){ // Modifica um usuário do bd
      let deferred = $q.defer();
      DBService.connect();
      User.findById(user_data._id, function(err, user){ // Busca um usuário pela id
        if(err){
          return deferred.reject(err); // Em caso de erro na query ou não encontrar retorna uma falha
        }
        // Modifica os campos originais
        user.name = user_data.name;
        user.role = user_data.role;
        user.picture = user_data.picture;
        user.description = user_data.description;

        user.save((err) => { // Salva os novos dados
          DBService.disconnect();
          if(err){
            return deferred.reject(err);
          }
          return deferred.resolve(user);
        })
      })
      return deferred.promise;
    }

    // Remove User
    service.remove = function(user_data){ // Remove um usuário do banco de dados
      let deferred = $q.defer();
      DBService.connect();
      User.remove(user_data, function(err, op){
        if(err){
          return deferred.reject(err);
        }
        return deferred.resolve(op);
      })

      return deferred.promise;
    }

    return service;
  }
})()
