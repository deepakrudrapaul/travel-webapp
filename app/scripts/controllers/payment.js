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
      "key": "rzp_live_lhuK7gjYSF90ee",
      "amount": 100,    
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
        showPaymentModal();
      }
    };

    $scope.pay = function() {
      var rzp = new Razorpay(options);
      rzp.open();
    };

    var onSuccess = function() {
      
    };

    var showPaymentModal = function() {
      angular.element(document.querySelectorAll('#paymentModal')).modal('show');
    };
    
  });
