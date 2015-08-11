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

  //$locationProvider.html5Mode(true);

}]);

//--------------------------------------
//  Controllers
//--------------------------------------

app.controller('MainCtrl', ['$scope', '$document', '$window', '$timeout', 
  function($scope, $document, $window, $timeout) {

  var portfolioModalImage = $document[0].getElementsByClassName('portfolio-modal-image')[0];

  $scope.portfolioModalShown;
  $scope.portfolioModalImage;

  var currentPortfolioItem;

  $scope.showPortfolioModal = function(item) {
    currentPortfolioItem = item;

    var image = new $window.Image();

    image.onload = function() {
      //console.debug(this.width, this.height);
      //console.debug(portfolioModalImage);
      if(this.height > $window.innerHeight) {
        portfolioModalImage.style.maxHeight = 'none';
        portfolioModalImage.style.bottom = 'auto';
      } else {
        portfolioModalImage.style.maxHeight = '100%';
        portfolioModalImage.style.bottom = '0';
      }
      
      $scope.portfolioModalImage = this.src;
      $scope.portfolioModalShown = true;
      $scope.$apply();
    };
    
    image.src = item.origin;
  };

  $scope.hidePortfolioModal = function() {
    console.debug('hidePortfolioModal');
    $scope.portfolioModalShown = false;
    $timeout(function() {
      $scope.portfolioModalImage = '';
      portfolioModalImage.src = '';
    }, 200);
  };

  $scope.prevPortfolioImage = function($event) {
    $event.stopPropagation ();
    //console.debug('prevPortfolioImage');

    var prevIndex = $scope.portfolioItems.indexOf(currentPortfolioItem) - 1;

    if(prevIndex < 0) {
      prevIndex = $scope.portfolioItems.length - 1;
    }

    $scope.hidePortfolioModal();

    $timeout(function() {
      $scope.showPortfolioModal($scope.portfolioItems[prevIndex]);
    }, 250);
  };

  $scope.nextPortfolioImage = function($event) {
    $event.stopPropagation ();
    //console.debug('nextPortfolioImage');

    var nextIndex = $scope.portfolioItems.indexOf(currentPortfolioItem) + 1;

    if(nextIndex >= $scope.portfolioItems.length) {
      nextIndex = 0;
    }

    $scope.hidePortfolioModal();
    
    $timeout(function() {
      $scope.showPortfolioModal($scope.portfolioItems[nextIndex]);
    }, 250);
  };

  $scope.portfolioItems = [
    { thumb: 'images/portfolio/bahamut_1st_thum.png', origin: 'images/portfolio/bahamut_1st.jpg' },
    { thumb: 'images/portfolio/bahamut_event_thum.png', origin: 'images/portfolio/bahamut_event.png' },
    { thumb: 'images/portfolio/businesscard_thum.png', origin: 'images/portfolio/businesscard.png' },
    { thumb: 'images/portfolio/daummobage_sp_thum.png', origin: 'images/portfolio/daummobage_sp.png' },
    { thumb: 'images/portfolio/daummobage_thum.png', origin: 'images/portfolio/daummobage.png' },
    { thumb: 'images/portfolio/dearlife_thum.png', origin: 'images/portfolio/dearlife.png' },
    { thumb: 'images/portfolio/desc_logo_thum.png', origin: 'images/portfolio/desc_logo.png' },
    { thumb: 'images/portfolio/thum_dot_room.jpg', origin: 'images/portfolio/dot_room.jpg' },
    { thumb: 'images/portfolio/emoji_thum.png', origin: 'images/portfolio/emoji.png' },
    { thumb: 'images/portfolio/hungryapp_thum.png', origin: 'images/portfolio/hungryapp.png' },
    { thumb: 'images/portfolio/thum_illust_001.jpg', origin: 'images/portfolio/illust_001.jpg' },
    { thumb: 'images/portfolio/thum_illust_002.jpg', origin: 'images/portfolio/illust_002.jpg' },
    { thumb: 'images/portfolio/thum_illust_003.jpg', origin: 'images/portfolio/illust_003.jpg' },
    { thumb: 'images/portfolio/thum_illust_004.jpg', origin: 'images/portfolio/illust_004.jpg' },
    { thumb: 'images/portfolio/intro_thum.png', origin: 'images/portfolio/intro.jpg' },
    { thumb: 'images/portfolio/kencom_thum.png', origin: 'images/portfolio/kencom.jpg' },
    { thumb: 'images/portfolio/kisekae_thum.png', origin: 'images/portfolio/kisekae.png' },
    { thumb: 'images/portfolio/point_thum.png', origin: 'images/portfolio/point.png' }
  ];

  

  

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
