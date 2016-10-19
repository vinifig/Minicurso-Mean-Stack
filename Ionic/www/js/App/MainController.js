// MainController.js
angular.module('minicurso.app')
  .controller('MainController', function($scope, ApiService, $storage){
    var usersKey = "_users_";
    $scope.users = [];

    var loadData = function(){
      ApiService.performCall('user').then(
        function(data){
          $storage.setItem(usersKey, data);
          data.forEach(function(user){
            var exists = false;
            for(var i = 0; i<$scope.users.length; i++){
              if(user._id == $scope.users[i]._id){
                console.log("Esse cara existe");
                exists = true;
                for(var key in user){
                  if(user[key] !== $scope.users[i][key])
                    user[key] = $scope.users[i][key];
                }

              }
              break;
            }
            if(!exists)
              $scope.users.push(user);
          })
          // $scope.users = data;
        },
        function(error, status){
          console.log(error,status);
        }
      );
    }

    var loadFromLocalStorage = function(){
      $scope.users = $storage.getItem(usersKey);
    }

    loadFromLocalStorage()
    setInterval(loadData, 5000)
  })
