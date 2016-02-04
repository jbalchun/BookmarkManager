
var app = angular.module('MyApp.BookmarkFactory', []);
app.factory('BookmarkFactory',function(){
  /*Bookmark model definition*/
  function Bookmark(url,descr,tags,category){
    this.url = url;
    this.descr = descr;
    this.tags = tags;
    this.category = category;

  }

  Bookmark.build = function(viewObj){
    return new Bookmark(viewObj.url,viewObj.descr,viewObj.tags,viewObj.category);
  }

  return Bookmark

});
