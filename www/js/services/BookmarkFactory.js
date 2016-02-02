/**
 * Created by Jbalchun on 2/1/16.
 */
var app = angular.module('MyApp.BookmarkFactory', []);
app.factory('BookmarkFactory',function(){

  return function bookMark(title,tags,url){

    return{
      id: '',//add a function to generate an id
      title:title,
      tags:tags,
      url:url
    }

  }

});
