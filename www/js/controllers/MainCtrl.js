/**
 * Created by Jbalchun on 2/1/16.
 */
var app = angular.module('Bookmarks.MainCtrl', []);
app.controller('MainCtrl',function($scope){
  $scope.bookmarks = [{title:'go'},{title:'stop'},{title:'go'},{title:'stop'},{title:'go'},{title:'stop'}]

});
