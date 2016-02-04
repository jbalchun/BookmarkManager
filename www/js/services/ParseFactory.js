var app = angular.module('MyApp.ParseFactory', []);

app.factory('ParseFactory', function ($rootScope) {
  /*Interface to our BaaS, Parse*/
  return {
    register:function(userData){
      var factory = this;
      console.log('registering')
      var user = new Parse.User();
      user.set("username", userData.email);
      user.set("password", userData.password);
      user.set("email", userData.email);
      user.signUp(null, {
        success: function(user) {
          $rootScope.$broadcast('logged-in');
          $rootScope.email = userData.email;
          $rootScope.$storage.username = userData.email;
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
          $rootScope.$broadcast('logged-in');
          $rootScope.$storage.username = userData.email;

        },
        error: function(user, error) {
          console.log(error);
          alert('Error: No connection or invalid username/password');
          return false;
        }
      });
    },

    saveNew:function(model){
      var factory = this;
        var stringStorage = JSON.stringify(model);
        var Backup = Parse.Object.extend("Backup");
        var backup = new Backup();

        console.log('backing up',$rootScope.username);
        backup.set('username',$rootScope.username);
        backup.set('file',stringStorage);
        backup.save(null, {
          success: function(backup) {
            //alert('saved the file');
            console.log('save success');
          },
          error: function(backup, error) {
            //alert('Failed save');
            console.log('save err',error);
          }
        });
    },

    deleteThenSave:function(model){//TODO dangerous to delete before save. transaction model or queue up deletes for later
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
          factory.saveNew(model);
        },
        error: function(error) {
          console.log('delete err',error);
          //alert("Error: " + error.code + " " + error.message);
        }
      });

    },
    loadFrom:function(username,DataService){
      var query = new Parse.Query("Backup");
      console.log('queryname',username)
      query.equalTo("username",username);
      query.find({
        success: function(results) {

          if(results[0]){
            console.log('result',results[0].get('file'));
            console.log('parse',JSON.parse(results[0].get('file')));
            DataService.setModel(JSON.parse(results[0].get('file')));
          }
        },
        error: function(error) {
          //alert("Error: " + error.code + " " + error.message);
        }
      });

    }
  };
});
