// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('Bookmarks', ['ionic',
  'Bookmarks.SideCtrl',
  'Bookmarks.MainCtrl',
  'MyApp.BookmarkFactory',
  'MyApp.DataService',
  'ngStorage',
  'ngTagsInput',
  'MyApp.ParseFactory'])

.run(function($ionicPlatform,$rootScope,$localStorage,DataService) {
  $ionicPlatform.ready(function() {
    $rootScope.$storage = $localStorage;
    Parse.initialize("SiCbzRW2kNcln8iLcYyPj85mY5qp8Xa1R3nkWOZi", "Bdyh495XAOVYCbZVVDasYmZ3f94U04OrUuS6q7th");
    $rootScope.$storage = $localStorage.$default({
      mainObject:{
        DataService:DataService
      }
    });


  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'SideCtrl'
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

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/main');
});
