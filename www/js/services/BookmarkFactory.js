
var app = angular.module('MyApp.BookmarkFactory', []);
app.factory('BookmarkFactory',function(){

  function Bookmark(url,name,tags,category){
    this.url = url;
    this.title = title;
    this.tags = tags;
    this.category = category;

  }

  //Bookmark.prototype.funcName = function()

  Bookmark.build = function(viewObj){

    return new Bookmark(viewObj.url,viewObj.title,viewObj.tags,viewObj.category);

  }

  return Bookmark


});
