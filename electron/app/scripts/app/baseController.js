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
  $scope.newUser = function(){
    currentUserIndex = -1;
    $scope.currentUser = {};
  }

  $scope.editUser = function($index){
    currentUserIndex = $index;
    $scope.currentUser = $scope.users[currentUserIndex];
  }

  $scope.removeUser = function(){
    UserService.remove($scope.currentUser).then(
      (op) => {
        console.log("removed");
        loadUsers();
        $scope.newUser();
      },
      (err,data) => {
        console.log("not removed");
      }
    )
  }

  $scope.save = function(){
    if(currentUserIndex == -1){
      // save
      UserService.insert($scope.currentUser).then(
        (success) => {
          console.log("New user was added into your database");
          loadUsers();
          $scope.newUser();
        },
        (err, data) => {
          console.log("Error: Can't add the new user into your database");
          console.log(err, data);
        }
      )
    }else{
      // update
      UserService.update($scope.currentUser).then(
        (success) => {
          console.log("User Updated");
          loadUsers();
          $scope.newUser();
        },
        (err, data) => {
          console.log("Error: Can't Update user");
          console.log(err, data);
        }
      )
    }
  }


  // On init
  $scope.$on('$routeChangeSuccess', function () {
    loadUsers();
  });
}
