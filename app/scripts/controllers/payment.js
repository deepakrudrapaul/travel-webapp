'use strict';

/**
 * @ngdoc function
 * @name wanderwagon-webapp.controller:PaymentCtrl
 * @description
 * # PaymentCtrl
 * Controller of the wanderwagon-webapp
 */
angular.module('wanderwagon-webapp')
  .controller('PaymentCtrl', function ($scope) {

    $scope.isPaymentDone = false;

    var options = {
      "key": "rzp_test_4aqB2hQu7SmUzA",
      "amount": 1000000,    
      "name": "Wanderwagon Pvt Ltd",
      "image": "https://s3-ap-southeast-1.amazonaws.com/wanderwagon/images/logo/logo-short.png",        
      "description": "Kheerganga Trek Booking",
      "prefill": {
          "name": "Deepak Paul",
          "email": "deepak@wanderwagon.com"
      },
      "notes": {
          "address": "Hello World"
      },
      "theme": {
          "color": "blue"
      },
      handler: function(response) {
        onSuccess(response);
        console.log(response.razorpay_payment_id)
      }
    };

    $scope.pay = function() {
      var rzp = new Razorpay(options);
      rzp.open();
    };

    var onSuccess = function() {
      
    };
    
  });
