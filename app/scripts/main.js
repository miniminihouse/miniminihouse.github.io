(function() {

  //------------------------------------------------------------------------------
  //
  //  Initialize
  //
  //------------------------------------------------------------------------------

  var app = angular.module('miniminihouse', [
    'ngRoute',
    'ngTouch',
    'ngAnimate',
  ]);

  //--------------------------------------
  //  Routes
  //--------------------------------------

  app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider.when('/', { templateUrl: 'views/home.html' });
    $routeProvider.when('/profile', { templateUrl: 'views/profile.html' });
    $routeProvider.when('/portfolio', { templateUrl: 'views/portfolio.html' });
    $routeProvider.when('/contact', { templateUrl: 'views/contact.html' });
    $routeProvider.otherwise('/');

    $locationProvider.html5Mode(true);

  }]);

  //--------------------------------------
  //  Controllers
  //--------------------------------------

  app.controller('MainCtrl', ['$scope', function($scope) {

  }]);

  //----------------------------------
  //  RootScope
  //----------------------------------

  app.run(['$rootScope', '$location', function($rootScope, $location) {

    $rootScope.$on('$routeChangeSuccess', function($event, current, previous) {
      $rootScope.currentPath = $location.$$path;
    });

    $rootScope.navigate = function(path, search) {
      if(path) {
        $location.path(path);
      }

      if(search) {
        $location.search(search);
      }
    };

  }]);

  angular.bootstrap(document, ['miniminihouse']);

  //------------------------------------------------------------------------------
  //
  //  Workarounds
  //
  //------------------------------------------------------------------------------

  //--------------------------------------
  //  iOS Safari bug
  //--------------------------------------

  window.addEventListener('orientationchange', function() {
    if(90 === window.orientation || -90 === window.orientation) {
      document.body.scrollTop = 0;
    }
  }, false);

})();
