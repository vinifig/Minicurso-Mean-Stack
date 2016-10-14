(function(){
  'use strict';
  angular.module('app.db')
    .service('UserService', ['DBService', '$q', UserService]);

  function UserService(DBService, $q) {
    let service = {};

    service.setDBSettings = DBService.setDBSettings;

    // Find Users

    service.getAll = function(){
      return service.find({});
    }

    service.find = function(search){
      let deferred = $q.defer();
      DBService.connect();
      User.find(search, function(err, items){
        DBService.disconnect();
        if(err)
        return deferred.reject(err);
        return deferred.resolve(items);
      })
      return deferred.promise;
    }

    service.getOne = function(search){
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

    service.insert = function(user_data){
      let deferred = $q.defer();
      DBService.connect();
      let user = new User(user_data);
      user.save((err) => {
        DBService.disconnect();
        if(err)
          return deferred.reject(err);
        return deferred.resolve(user_data);
      })
      return deferred.promise;
    }

    // Edit User
    service.update = function(user_data){
      let deferred = $q.defer();
      DBService.connect();
      User.findById(user_data._id, function(err, user){
        if(err){
          return deferred.reject(err);
        }
        user.name = user_data.name;
        user.role = user_data.role;
        user.picture = user_data.picture;
        user.description = user_data.description;
        user.save((err) => {
          DBService.disconnect();
          if(err){
            return deferred.reject(err);
          }
          return deferred.resolve(user);
        })
      })
      return deferred.promise;
    }

    return service;
  }
})()
