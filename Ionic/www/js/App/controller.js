(function(){
    angular.module('minicurso')
        .controller('MainController', ['$scope', 'UserService', MainController]);

    function MainController($scope, UserService){
        $scope.title='Minicurso'
        $scope.users = [];
        const updateUsers = function(){
          UserService.getAll().then(
            (users) => {
              users.forEach(function(user){
                let found = false;
                for(let i = 0; i < $scope.users.length; i++){
                  if($scope.users[i]._id == user._id){
                    found = true;
                    for(let key in user){
                      if($scope.users[i][key] != user[key]);
                      $scope.users[i][key] = user[key]
                    }
                    break;
                  }
                }
                if(!found){
                  $scope.users.push(user);
                }
              })
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
