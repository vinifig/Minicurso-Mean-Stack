angular.module('minicurso')
  .service('ApiService', function($http, $q) {

  var baseURL = "http://localhost:8080/";

  var req = {
   method: 'GET',
   url: baseURL,
   headers: { }
  };

  var headerJson = {
     'Content-Type': 'application/json'
  };

  var services = {};

  services.performCall = function(module) {
    var deferred = $q.defer();
        req.headers = headerJson;
        req.url = baseURL + module;

        $http(req)
          .success(function(data){
            deferred.resolve(data);
          })
          .error(function(data, status){
            deferred.reject("error-do-api-call-" + status);
          });
    //   }
    // }

    return deferred.promise;
  }

  return services;

});
