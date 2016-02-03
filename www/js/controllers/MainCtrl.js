var app = angular.module('Bookmarks.MainCtrl', []);
app.controller('MainCtrl',function($scope,BookmarkFactory,DataService,$rootScope,$ionicPlatform){
  /*Scope vars*/
  $scope.viewBookmark = {url: '',tags:[],category:'',descr:''};
  $scope.searchText = '';
  $scope.tags = ['Food','Education'];


  /*On Controller load*/
  $ionicPlatform.ready(function(){
    $scope.bookmarks = DataService.getBookmarks($scope.bookmarks);
  });

  /*Scope methods*/
  $scope.requestTagAndCats = function(){
    $scope.categories = DataService.getCategories();
    $scope.tags = DataService.getTags();
    console.log('ctrltags',$scope.tags);
  }

  $scope.addBookmark = function(){
    var viewObject = $scope.viewBookmark;
    console.log(viewObject);
    var newBookmark = BookmarkFactory.build(viewObject);
    $scope.bookmarks.unshift(newBookmark);
    cleanUpForm();
    saveTags(viewObject.tags);
    DataService.setBookmarks($scope.bookmarks);
  };

  $scope.removeBookmark = function(index){
    //take bookmark id and delete in parse, reload data.
    $scope.bookmarks.splice(index,1);
    DataService.setBookmarks($scope.bookmarks);
    /*
     ParseFactory.removeBookmark(id);
     */
  };

  $scope.editBookmark = function(index){
    //Edit the bookmark on scope, send to parse to update but don't refresh until needed.
    var currentBookmark =$scope.bookmarks[index];
    $scope.bookmarks[index] = currentBookmark; //mock for dao
    currentBookmark.editing = false;
    DataService.setBookmarks($scope.bookmarks);
    //send update to parse

  };

  /*Misc.*/
  $scope.$on('cat-filter',function(event,args){
      $scope.searchText = args.text;
  });

  var cleanUpForm = function(){
    $scope.viewBookmark = {url: '',descr:'',tags:[],category:''};
  };

  var saveTags = function(tags){
    DataService.saveTags(tags);
  };
});
