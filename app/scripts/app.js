'use strict';

/**
 * @ngdoc overview
 * @name picsApp
 * @description
 * # picsApp
 *
 * Main module of the application.
 */
angular
  .module('picsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/orders', {
        templateUrl: 'views/orders.html',
        controller: 'OrdersCtrl',
        controllerAs: 'orders'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

angular.module('picsApp').constant("orderUrl", "http://pj-b.fr/mse/pics/__dev/app/php/order.php");
//angular.module('picsApp').constant("orderUrl", "http://pj-b.byethost17.com/order.php");

angular.module('picsApp').constant("pics", [
    PICS_FILENAMES_HERE
]);

angular.module('picsApp').directive('uppercase', function() {
   return {
     require: 'ngModel',
     link: function(scope, element, attrs, modelCtrl) {
        var capitalize = function(inputValue) {
           if(inputValue == undefined) inputValue = '';
           var capitalized = inputValue.toUpperCase();
           if(capitalized !== inputValue) {
              modelCtrl.$setViewValue(capitalized);
              modelCtrl.$render();
            }         
            return capitalized;
         }
         modelCtrl.$parsers.push(capitalize);
         capitalize(scope[attrs.ngModel]);  // capitalize initial value
     }
   };
});
