(function(){
    angular.module('minicurso.storage', [])
        .service('StorageService', [StorageService]);

    function StorageService(){
      const service = {};

      service.add = function(key, value){
        let tempArray = localStorage.getItem(key);
        if(tempArray == undefined){
          tempArray = '[]';
        }
        tempArray = JSON.parse(tempArray);
        tempArray.push(value);
        localStorage.setItem(key, JSON.stringify(tempArray));
      }

      service.erase = function(key){
        localStorage.setItem(key, '[]');
      }

      service.get = function(key){
        return JSON.parse(localStorage.getItem(key) || '[]') ;
      }

      service.set = function(key, value){
        return localStorage.setItem(key, JSON.stringify(value || []));
      }

      service.clear = localStorage.clear;
      return service;
    }
})()
