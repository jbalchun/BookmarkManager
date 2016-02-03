var app = angular.module('Bookmarks.MainCtrl', []);
app.controller('MainCtrl',function($scope,BookmarkFactory,DataService){
  $scope.viewBookmark = {url: '',tags:[],category:'',descr:''};
  $scope.searchText = '';
  $scope.tags = ['Food','Education'];
  $scope.bookmarks = [
    {url: 'http123',name:'Goodone',tags:[],folder:'',id:'12'},
    {url: 'http123',name:'Goodone',tags:[],folder:'',id:'13'},
    {url: 'http123',name:'Goodone',tags:[],folder:'',id:'14'},
  ];


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
    /*
     ParseFactory.addBookmark(newBookmark);
     */
    //hand off to parse factory at this point, with user and bookmark.
  }

  $scope.removeBookmark = function(index){
    //take bookmark id and delete in parse, reload data.
    $scope.bookmarks.splice(index,1);
    /*
     ParseFactory.removeBookmark(id);
     */
  }

  $scope.editBookmark = function(index){
    //Edit the bookmark on scope, send to parse to update but don't refresh until needed.
    var currentBookmark =$scope.bookmarks[index];
    $scope.bookmarks[index] = currentBookmark; //mock for dao
    currentBookmark.editing = false;
    //send update to parse

  }

  var cleanUpForm = function(){
    $scope.viewBookmark = {url: '',descr:'',tags:[],category:''};
  }

  var saveTags = function(tags){
    DataService.saveTags(tags);
  }
});
