'use strict';

angular.module('bayes2016App')
  .controller('SignupCtrl', function ($scope, Auth, $location) {
    $scope.user = {};
    $scope.errors = {};

    $scope.register = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.createUser({
          name: $scope.user.name,
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Account created, redirect to home
          $location.path('/');
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the sql errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('sql', false);
            $scope.errors[field] = error.message;
          });
        });
      }
    };

  });
