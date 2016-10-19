angular.module('minicurso.storage')
  .service('$storage', function(){
    var service = {};

    service.setItem = function(key, value){
      return localStorage.setItem(key, JSON.stringify(value) || '[]');
    }

    service.getItem = function(key){
      return JSON.parse(localStorage.getItem(key) || '[]');
    }


    return service;
  });
