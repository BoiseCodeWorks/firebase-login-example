/* global Firebase */
var app = angular.module('login', []);

app.constant('FBREF', 'https://stackunderflow.firebaseio.com/')

app.controller('AuthController', function($scope, FBREF){
    
    var db = new Firebase(FBREF);
    
    console.log("What even is a firebase Object?", db, 'Yeah its complicated.')    
    
    
    function handleDBResponse (err, authData){
        if(err){
            console.log(err);
            return;
        } 
        console.log(authData);
        var userToSave = {
            username: $scope.user.email,
            reputation: 0,
            created: Date.now()
        }
        //THis LINE SAVES THE USER INFO INTO THE FIREBASE DB
        db.child('users').child(authData.uid).update(userToSave)
    }
    
    
    $scope.register = function(user){
        db.createUser(user, handleDBResponse)
    }
    
    $scope.login = function(user){
        console.log('does it work?', user.email, user.password)
        
        /**
         * We need to take the input from our form
         * and pass it to our database, 
         * DB is responsible for authenticating the user
         * after the user info is validated
         * the DB will send back either an Error,
         * or the authData for that user 
         * authData.uid <--- we want this 
         */
        
        db.authWithPassword(user, handleDBResponse)
        
        
        
        
        // db.authWithEmailAndPassword({
        //     email: user.email,
        //     password: user.password
        // }, function(err, authData){
            
        // })
        
    }
})