'use strict';
angular.module('app')
  .controller('baseController', ['$scope', 'UserService', BaseController]); // Aqui devemos incluir a nossa UserService no BaseController

function BaseController($scope, UserService) { // Adicionando o paramêtro para que o Angular faça a injeção da váriavel.
  // Private attributes
  let currentUserIndex = -1; // Variável interna para guardar refêrencia do usuário selecionado.

  // Private functions
  function loadUsers(){ // Método privado que atualiza os usuários do nosso controller
    UserService.getAll().then(
      (users) => { //arrow functions
        $scope.users = users;
        console.log(users);
      },
      (err, data) => {
        console.log(err, data);
      }
    )
  }

  // public attributes || Váriaveis que a view terá acesso
  $scope.users = []; // Lista de usuários
  $scope.currentUser = {}; // Usuário que está, ou não, sendo editado no momento

  // public methods
  $scope.newUser = function(){ // Método para limpar o formulário, para criar um novo usuário
    currentUserIndex = -1;
    $scope.currentUser = {};
  }

  $scope.editUser = function($index){ // Método para jogar o usuário atual no formulário para edição
    currentUserIndex = $index;
    $scope.currentUser = $scope.users[currentUserIndex];
  }

  $scope.removeUser = function(){ // Método que implementa o método de remoção de usuário. Chamado quando clicarem no botão de remoção dentro da view
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

  $scope.save = function(){ // Método que implementa o botão de salvar os dados do formulário.
    let new_user = currentUserIndex == -1;
    if(new_user){ // Se está criando um novo usuário chama a função de insert
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
    }else{ // Senão chama a função de update
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
  $scope.$on('$routeChangeSuccess', function () { // Quando o angular emitir um evento de alteração de rotas(ou seja, quando a página carregar) chamar o método para atualizar a lista de usuários.
    loadUsers();
  });
}
