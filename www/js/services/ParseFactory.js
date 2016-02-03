var app = angular.module('MyApp.ParseFactory', []);

app.factory('ParseFactory', function ($rootScope) {
  return {
    register:function(userData){
      var factory = this;
      var user = new Parse.User();
      user.set("username", userData.email);
      user.set("password", userData.password);
      user.set("email", userData.email);
      user.signUp(null, {
        success: function(user) {
          //alert("success!");
          $rootScope.email = userData.email;
          alert('Registration successful');
          //broadcast succesfully registered
          //factory.deleteThenSave();
        },
        error: function(user, error) {
          console.log(error);
          if(error.code == 125){
            alert('Error, invalid email address');
          }
          if(error.code == 202){
            alert('Error, username is taken! Already an account w/ this email');
          }else{
            alert('Error signing up, make sure email is valid');
          }
        }
      });
    },
    logIn:function(userData){
      var factory = this;
      $rootScope.username = userData.email;
      $rootScope.email = userData.email;
      console.log('logging in');
      Parse.User.logIn(userData.email, userData.password,{
        success: function(user) {
          factory.loadFrom(userData.email);
        },
        error: function(user, error) {
          alert('Error: No connection or invalid username/password');
        }
      });
    },
    saveNew:function(){
      var factory = this;
        var stringStorage = JSON.stringify($rootScope.$storage.mainObject);
        var Backup = Parse.Object.extend("Backup");
        var backup = new Backup();

        backup.set('username',$rootScope.username);
        backup.set('file',stringStorage);
        backup.save(null, {
          success: function(backup) {
            //alert('saved the file');
          },
          error: function(backup, error) {
            //alert('Failed save');
          }
        });
    },

    deleteThenSave:function(){//TODO dangerous to delete before save. transaction model or queue up deletes for later
      var factory = this;
      var query = new Parse.Query("Backup");
      console.log('deleting')
      query.equalTo("username",$rootScope.username);
      query.find({
        success: function(results) {
          //alert("Successfully retrieved " + results.length +$rootScope.uid+ " scores.");
          // Do something with the returned Parse.Object values
          for (var i = 0; i < results.length; i++) {
            results[i].destroy({});
          }
          factory.saveNew();
        },
        error: function(error) {
          //alert("Error: " + error.code + " " + error.message);
        }
      });

    },
    loadFrom:function(username){
      //load row by userId
      //var stringStorage = JSON.stringify($rootScope.$storage);
      var query = new Parse.Query("Backup");
      query.equalTo("username",username);
      query.find({
        success: function(results) {
          console.log('result',results[0].get('file'));
          console.log('parse',JSON.parse(results[0].get('file')));
          $rootScope.$storage.mainObject = JSON.parse(results[0].get('file'));
          $rootScope.$broadcast('cloud-load');
          $rootScope.justLoaded = true;
        },
        error: function(error) {
          //alert("Error: " + error.code + " " + error.message);
        }
      });

    }
  };
});
