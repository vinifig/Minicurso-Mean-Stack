(function(){
    angular.module('minicurso')
        .service('UserService', ['ApiService', 'StorageService', '$q', UserService]);

    function UserService(ApiService, StorageService, $q){
      const service = {};
      const usersKey = '_users_'
      service.getAll = function(){
        let deferred = $q.defer();
        let users = StorageService.get(usersKey);
        let resolved = false;
        if(users.length != 0){
          resolved = true;
          deferred.resolve(users);
        }
        ApiService.performCall('user').then(
          (users)=>{
            if(!resolved)
              deferred.resolve(users);
            StorageService.set(usersKey, users)
            console.log('Successful Operation: Users Request');
          },
          (err, data)=>{
            deferred.reject("error-do-users-request-" + status);
            console.log(err, data)
          }
        )


        return deferred.promise;
      }
      return service;
    }
})()
