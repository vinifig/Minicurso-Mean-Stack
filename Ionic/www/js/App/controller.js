(function(){
    angular.module('minicurso')
        .controller('MainController', ['$scope', 'UserService', MainController]);

    function MainController($scope, UserService){
        $scope.title='Minicurso'
        $scope.users = [];
        const updateUsers = function(){
          UserService.getAll().then(
            (users) => {
              $scope.users = users;
            },
            (data, status) => {
              console.log(`error: ${status}`);
            }
          )
        }
        updateUsers();
        setInterval(updateUsers, 3000)
    }
})()
