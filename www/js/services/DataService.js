var app = angular.module('MyApp.DataService', []);
app.factory('DataService', function ($localStorage,$rootScope,ParseFactory,$timeout) {

  /*
  * Injectable factory that will act as the backbone for the apps data*/
  return {
    categories: [],
    tags: ['Cool'],
    bookmarks: [{url: 'https://www.vts.com/', tags: ['Cool'], category: '', descr: 'Demo bookmark'}],

    setCategories: function (categories) {
      this.categories = categories;
      this.saveData();
    },

    getCategories: function () {
      console.log('servcats', this.categories);
      return this.categories;
    },

    saveTags: function (tags) {
      for (var i = 0; i < tags.length; i++) {
        this.tags.push(tags[i].text);
      }
      this.saveData();
    },

    getTags: function () {
      return this.tags;
    },

    setBookmarks: function (bookmarks) {
      this.bookmarks = bookmarks;
      this.saveData();
    },

    getBookmarks: function () {
      return this.bookmarks;
    },

    setModel: function (model) {
      console.log(model,this);
      this.categories = model.categories;
      this.tags = model.tags;
      this.bookmarks = model.bookmarks;
      /*Model would not apply without this... some issue with digest perhaps*/
      $timeout(function() {
        this.categories = model.categories;
        this.tags = model.tags;
        this.bookmarks = model.bookmarks;
      },30);
      $rootScope.$broadcast('cloud-load');
    },

    cloudLoad:function(){
      ParseFactory.loadFrom($rootScope.username,this);
    },

    getModel: function () {
      return {categories: this.categories, tags: this.tags, bookmarks: this.bookmarks};
    },

    saveData: function () {
      ParseFactory.deleteThenSave(this.getModel());
    }
  }



});
