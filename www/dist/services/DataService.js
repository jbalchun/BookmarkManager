var app=angular.module("MyApp.DataService",[]);app.factory("DataService",["$localStorage","$rootScope","ParseFactory",function(t,o,a){return{categories:[],tags:["Cool"],bookmarks:[{url:"https://www.vts.com/",tags:["Cool"],category:"",descr:"Demo bookmark"}],setCategories:function(t){this.categories=t,this.saveData()},getCategories:function(){return console.log("servcats",this.categories),this.categories},saveTags:function(t){for(var o=0;o<t.length;o++)this.tags.push(t[o].text);this.saveData()},getTags:function(){return this.tags},setBookmarks:function(t){this.bookmarks=t,this.saveData()},getBookmarks:function(){return this.bookmarks},setModel:function(t){console.log(t,this),this.categories=t.categories,this.tags=t.tags,this.bookmarks=t.bookmarks,o.$broadcast("cloud-load")},cloudLoad:function(){a.loadFrom(o.username,this)},getModel:function(){return{categories:this.categories,tags:this.tags,bookmarks:this.bookmarks}},saveData:function(){a.deleteThenSave(this.getModel())}}}]);