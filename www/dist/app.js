angular.module("Bookmarks",["ionic","Bookmarks.MenuCtrl","Bookmarks.MainCtrl","MyApp.BookmarkFactory","MyApp.DataService","ngStorage","ngTagsInput","MyApp.ParseFactory"]).run(["$ionicPlatform","$rootScope","$localStorage",function(a,t,r){a.ready(function(){t.$storage=r,Parse.initialize("SiCbzRW2kNcln8iLcYyPj85mY5qp8Xa1R3nkWOZi","Bdyh495XAOVYCbZVVDasYmZ3f94U04OrUuS6q7th"),t.$storage=r.$default({username:""})})}]).config(["$stateProvider","$urlRouterProvider",function(a,t){a.state("app",{url:"/app","abstract":!0,templateUrl:"templates/menu.html",controller:"MenuCtrl"}).state("app.Main",{url:"/main",views:{menuContent:{templateUrl:"templates/main.html",controller:"MainCtrl"}}}),t.otherwise("/app/main")}]);