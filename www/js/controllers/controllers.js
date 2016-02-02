var app = angular.module('Bookmarks.SideCtrl', [])

app.controller('SideCtrl', function($scope, $ionicModal, $timeout,$ionicPopup) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.categories = [{title:"Main"}, {title:"Education"}];

  $scope.filterMain = function(category){

  }

  $scope.addCategoryPop = function(){
    $ionicPopup.prompt({
      title: 'Add Category',
      template: 'Enter new Category name',
      inputType: 'text',
      inputPlaceholder: 'Category'
    }).then(function(res) {
      console.log('Category is', res);
      $scope.categories.push({title:res});
    });


  }








  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})




