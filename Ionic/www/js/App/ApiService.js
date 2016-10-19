angular.module('minicurso.app')
  .service("ApiService", function($http, $q){
    var urlBase = 'http://api.vinifig.me/';
    var requestOptions = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      },
      url: urlBase
    }

    var service = {};

    service.performCall = function(urlComplemento){
      var deferred = $q.defer();
      requestOptions.url = urlBase + urlComplemento;
      $http(requestOptions)
        .success(function(data){
          deferred.resolve(data);
        })
        .error(function(data, status){
          deferred.reject('error-do-api-call-'+status);
        })

      return deferred.promise;
    }

    return service;

  });
