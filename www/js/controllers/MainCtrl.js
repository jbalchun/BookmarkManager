var app = angular.module('Bookmarks.MainCtrl', []);
app.controller('MainCtrl',function($scope,BookmarkFactory,DataService,$rootScope,$ionicPlatform,$ionicPopup){
  /*Scope vars*/
  $scope.viewBookmark = {url: '',tags:[],category:'',descr:''};
  $scope.searchText = '';
  $scope.tags = ['Food','Education'];


  /*On Controller load*/
  $ionicPlatform.ready(function(){
    $scope.bookmarks = DataService.getBookmarks();
    if($rootScope.$storage.username.length === 0){
      $ionicPopup.alert({
        title: 'Log in or Register with the top right icon to use pagelocker',
        buttons: [
          {
            text: '<b>Ok</b>',
            type: 'button-balanced',
            onTap: function(e) {

            }
          }
        ]
      }).then(function(res) {
      });
    }
    if($rootScope.$storage.username.length > 0){
      $rootScope.username = $rootScope.$storage.username;
      DataService.cloudLoad();
    }

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

  };

  $scope.editBookmark = function(index){
    //Edit the bookmark on scope, send to parse to update but don't refresh until needed.
    var currentBookmark =$scope.bookmarks[index];
    $scope.bookmarks[index] = currentBookmark; //mock for dao
    currentBookmark.editing = false;
    DataService.setBookmarks($scope.bookmarks);
    //send update to parse

  };

  /*Event listeners*/
  $scope.$on('cat-filter',function(event,args){
      $scope.searchText = args.text;
  });
  $scope.$on('cloud-load',function(){
    $scope.bookmarks = DataService.getBookmarks();

  });
  $scope.$on('clear-filter',function(){
    $scope.searchText = '';

  });

  $scope.$on('logged-in',function(){
    DataService.cloudLoad();
    $scope.bookmarks = DataService.getBookmarks();
  });

  /*Misc*/
  var cleanUpForm = function(){
    $scope.viewBookmark = {url: '',descr:'',tags:[],category:''};
  };

  var saveTags = function(tags){
    DataService.saveTags(tags);
  };

});
