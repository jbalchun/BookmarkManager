
var app = angular.module('MyApp.BookmarkFactory', []);
app.factory('BookmarkFactory',function(){

  function Bookmark(url,descr,tags,category){
    this.url = url;
    this.descr = descr;
    this.tags = tags;
    this.category = category;

  }

  //Bookmark.prototype.funcName = function()

  Bookmark.build = function(viewObj){

    return new Bookmark(viewObj.url,viewObj.descr,viewObj.tags,viewObj.category);

  }

  return Bookmark


});
