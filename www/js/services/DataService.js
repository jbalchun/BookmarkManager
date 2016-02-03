/**
 * Created by Jbalchun on 2/2/16.
 */
var app = angular.module('MyApp.DataService', []);

app.factory('DataService', function ($localStorage,$rootScope,ParseFactory) {
  return{
    categories:['Main'],
    tags:['Cool'],
    bookmarks:[{url: 'https://www.vts.com/',tags:['Cool'],category:'',descr:'Demo bookmark'}],
    setCategories:function(categories){
      this.categories = categories;
      this.saveData();
    },
    getCategories:function(){
      console.log('servcats',this.categories);
      return this.categories;
    },
    saveTags:function(tags){
      for(var i=0;i<tags.length;i++){
        this.tags.push(tags[i].text);
      }
      this.saveData();
    },
    getTags:function(){
      return this.tags;
    },
    setBookmarks:function(bookmarks){
      this.bookmarks = bookmarks;
      this.saveData();
    },
    getBookmarks:function(){
      return this.bookmarks;
    },
    saveData:function(){
      $rootScope.$storage.mainObject.DataService = this;
      ParseFactory.deleteThenSave();
    }

  }
});
