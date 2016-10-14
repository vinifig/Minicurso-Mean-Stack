(function(){
  'use strict';
  angular.module('app.db')
    .service('UserService', ['DBService', '$q', UserService]);

  function UserService(DBService, $q) {
    let service = {};

    service.setDBSettings = DBService.setDBSettings;

    // Insert User

    service.insert = function(user_data){
      let deferred = $q.defer();
      DBService.connect();
      let user = new User(user_data);
      user.save(function(err){
        DBService.disconnect();
        if(err)
          return deferred.reject(err);
        return deferred.resolve(user_data);
      })
      return deferred.promise;
    }

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

    return service;
  }
})()
