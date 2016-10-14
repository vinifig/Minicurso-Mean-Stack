'use strict';
angular.module('app')
  .controller('baseController', ['$scope', 'UserService', BaseController]);

function BaseController($scope, UserService) {
  // Private attributes
  let currentUserIndex = -1;

  // Private functions
  function loadUsers(){
    UserService.getAll().then(
      (users) => { //arrow functions
        $scope.users = users;
      },
      (err, data) => {
        console.log(err, data);
      }
    )
  }

  // public attributes
  $scope.users = [];
  $scope.currentUser = {};

  // public methods
  $scope.save = function(){
    if(currentUserIndex == -1){
      // save
      UserService.insert($scope.currentUser).then(
        (success) => {
          console.log("New user was added into your database");
          $scope.currentUser = {};
          loadUsers();
        },
        (err, data) => {
          console.log("Error: Can't add the new user into your database");
          console.log(err, data);
        }
      )
    }else{
      // update
    }
  }


  // On init
  $scope.$on('$routeChangeSuccess', function () {
    loadUsers();
  });
}
