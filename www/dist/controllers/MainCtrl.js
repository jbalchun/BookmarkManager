var app=angular.module("Bookmarks.MainCtrl",[]);app.controller("MainCtrl",["$scope","BookmarkFactory","DataService","$rootScope","$ionicPlatform","$ionicPopup",function(o,a,t,e,r,n){o.viewBookmark={url:"",tags:[],category:"",descr:""},o.searchText="",o.tags=["Food","Education"],r.ready(function(){o.bookmarks=t.getBookmarks(),0===e.$storage.username.length&&n.alert({title:"Log in or Register with the top right icon to use pagelocker",buttons:[{text:"<b>Ok</b>",type:"button-balanced",onTap:function(o){}}]}).then(function(o){}),e.$storage.username.length>0&&(e.username=e.$storage.username,t.cloudLoad())}),o.requestTagAndCats=function(){o.categories=t.getCategories(),o.tags=t.getTags(),console.log("ctrltags",o.tags)},o.addBookmark=function(){var e=o.viewBookmark;console.log(e);var r=a.build(e);o.bookmarks.unshift(r),s(),k(e.tags),t.setBookmarks(o.bookmarks)},o.removeBookmark=function(a){o.bookmarks.splice(a,1),t.setBookmarks(o.bookmarks)},o.editBookmark=function(a){var e=o.bookmarks[a];o.bookmarks[a]=e,e.editing=!1,t.setBookmarks(o.bookmarks)},o.$on("cat-filter",function(a,t){o.searchText=t.text}),o.$on("cloud-load",function(){o.bookmarks=t.getBookmarks()}),o.$on("clear-filter",function(){o.searchText=""}),o.$on("logged-in",function(){t.cloudLoad(),o.bookmarks=t.getBookmarks()});var s=function(){o.viewBookmark={url:"",descr:"",tags:[],category:""}},k=function(o){t.saveTags(o)}}]);