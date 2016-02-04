angular.module('Bookmarks', ['ionic',
  'Bookmarks.MenuCtrl',
  'Bookmarks.MainCtrl',
  'MyApp.BookmarkFactory',
  'MyApp.DataService',
  'ngStorage',
  'ngTagsInput',
  'MyApp.ParseFactory'])

.run(function($ionicPlatform,$rootScope,$localStorage) {
  $ionicPlatform.ready(function() {
    $rootScope.$storage = $localStorage;
    Parse.initialize("SiCbzRW2kNcln8iLcYyPj85mY5qp8Xa1R3nkWOZi", "Bdyh495XAOVYCbZVVDasYmZ3f94U04OrUuS6q7th");
    $rootScope.$storage = $localStorage.$default({
      username:''
    });
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'MenuCtrl'
  })
    .state('app.Main', {
      url: '/main',
      views: {
        'menuContent': {
          templateUrl: 'templates/main.html',
          controller: 'MainCtrl'
        }
      }
    })
  $urlRouterProvider.otherwise('/app/main');
});
