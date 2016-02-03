/**
 * Created by Jbalchun on 2/2/16.
 */
var app = angular.module('MyApp.DataService', []);

app.factory('DataService', function () {
  var categories = [];
  var tags = [];
  var bookmarks = [];
  return{
    categories:[],
    tags:[],
    bookmarks:[],
    setCategories:function(categories){
      this.categories = categories;
    },
    getCategories:function(){
      console.log('servcats',this.categories);
      return this.categories;
    },
    saveTags:function(tags){
      for(var i=0;i<tags.length;i++){
        this.tags.push(tags[i].text);
      }
    },
    getTags:function(){
      return this.tags;
    },
    setBookmarks:function(){

    },
    getBookmarks:function(){

    }

  }
});
