var app = angular.module('Bookmarks.MenuCtrl', [])

app.controller('MenuCtrl', function($scope, $ionicModal, $timeout,$ionicPopup,DataService,$rootScope,ParseFactory) {

  $scope.categories = DataService.getCategories();

  $scope.filterMain = function(category){
    $rootScope.$broadcast('cat-filter',{text:category});
  };

  $scope.clearFilter = function(){
    $rootScope.$broadcast('clear-filter');
  }

  $scope.addCategoryPop = function(){
    $ionicPopup.prompt({
      title: 'Add Category',
      template: 'Enter new Category name',
      inputType: 'text',
      inputPlaceholder: 'Category'
    }).then(function(res) {
      console.log('Category is', res);
      $scope.categories.push(res);
      DataService.setCategories($scope.categories);
    });
  };

  // Form data for the login modal
  $scope.userData = {email:'',password:''};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    console.log('hide')
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  $scope.$on('logged-in',function(){
    $scope.modal.hide();
  });

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.userData);
    ParseFactory.logIn($scope.userData);

  };

  $scope.doRegister = function() {
    console.log('Doing register', $scope.userData);
    ParseFactory.register($scope.userData);

  };

})
