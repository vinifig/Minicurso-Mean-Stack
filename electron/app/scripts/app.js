'use strict';

const _templateBase = './scripts';

angular.module('app', [
  'ngRoute',
  'app.db'
])
.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: _templateBase + '/app/base.html' ,
            controller: 'baseController',
            controllerAs: '_ctrl'
        });
        $routeProvider.otherwise({ redirectTo: '/' });
    }
]);
