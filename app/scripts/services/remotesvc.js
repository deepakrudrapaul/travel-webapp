'use strict';

/**
 * @ngdoc service
 * @name wanderwagon-webapp.remoteSvc
 * @description
 * # remoteSvc
 * Factory in the wanderwagon-webapp.
 */
angular.module('wanderwagon-webapp')
  .factory('remoteSvc', function (auth, $http, ENV, $location) {

    var homePageData;
    var remoteAddr = ENV.endPoint;

    return {
      getConsumerProfile: function () {
        return $http({
          method: 'GET',
          headers: {
            'auth-token': auth.getToken()
          },
          url: remoteAddr + '/consumer/account/profile'
        })
      },

      updateConsumerProfile: function (profileObj) {
        return $http({
          method: 'POST',
          data: profileObj,
          headers: {
            'auth-token': auth.getToken()
          },
          url: remoteAddr + 'consumer/account/editprofile'
        })
      },

      getCurrentUri: function () {
        return $location.path();
      },


      getBlogList: function () {
        return $http({
          method: 'GET',
          url: remoteAddr + '/blogs/all'
        }).then(function (data, status){
           var posts = [];
          for (var i = 0; i < data.response.length; i++) {
            var post = data.response[i];
            posts[i] = {};
            posts[i].title = post.title;
            posts[i].author = post.user.name;
            posts[i].description = post.description;
            posts[i].imageUrl = post.imageUrl;
            posts[i].id = post.id;
            posts[i].comments = post.comments;
            posts[i].date = new Date(new Date("2017-12-09").getTime());
          }
        }, function (error, status) {

        })
      },

      getBlogDetail: function (postId) {
        return $http({
          method: 'GET',
          url: remoteAddr + '/blogs/blogdetail/' + postId
        }).then(function (data, status){
          return data.data;
        }, function (error, status){
          return error.data;
        });
      },


      getHomePageContent: function () {
        return $http({
          method: 'GET',
          url: remoteAddr + '/home'
        }).then(function (data, status) {
          return data.data;
        }, function (error, status) {
          return error.data;
        });
      },

      getTravelInspirationDetail: function(id) {
        return $http({
          method: 'GET',
          url: remoteAddr + '/inspiration/' + id
        }).then(function (data, status) {
          return data.data;
        }, function (error, status) {
          return error.data;
        })
      },

      getTravelPlanContent: function() {
        return $http({
          method: 'GET',
          url: remoteAddr + '/travel-plan'
        }).then(function (data, status){
          return data.data;
        }, function (error, status){
          return error.data;
        })
      },

      getDestinationsList: function() {
        return $http({
          method: 'GET',
          url: remoteAddr + '/destinations'
        }).then(function (data, status){
          return data.data;
        }, function (error, status){
          return error.data;
        })
      },

      getDestinationDetailById : function(id) {
        return $http({
          method: 'GET',
          url: remoteAddr + '/destinations/' + id
        }).then(function (data, status){
          return data.data;
        }, function (error, status){
          return error.data;
        })
      }


    };
  });
