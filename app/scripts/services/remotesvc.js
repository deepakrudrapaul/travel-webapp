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


      // **** BLOGS API ******* //


      getBlogList: function () {
        return $http({
          method: 'GET',
          url: remoteAddr + '/blogs/all'
        }).then(function (data, status){
           var posts = [];
           console.log(data.data.response);
          for (var i = 0; i < data.data.response.length; i++) {
            var post = data.data.response[i];
            posts[i] = {};
            posts[i].title = post.title;
            posts[i].author = post.user.name;
            posts[i].description = post.description;
            posts[i].imageUrl = post.imageUrl;
            posts[i].id = post.id;
            posts[i].comments = post.comments;
            posts[i].date = new Date(new Date(post.time).getTime());
          }
          return posts;
        }, function (error, status) {
          return error.data;
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

      getBlogInstaPhotos : function() {
        return $http({
          method: 'GET',
          url: remoteAddr + '/blogs/instaPhotos'
        })
      },

      getSimilarBlogs : function(blogId) {
        return $http({
          method: 'GET',
          url: remoteAddr + '/blogs/similarBlogs/' + blogId
        })
      },


      postComment: function (commentObj) {
        return $http({
          method: 'POST',
          headers: {
            'auth-token': auth.getToken()
          },
          data: commentObj,
          url: remoteAddr + '/blogs/comment'
        })
      },

      getCommentsByBlogId : function (blogId) {
        return $http({
          method: 'GET',
          url: remoteAddr + '/blogs/comments/' + blogId
        }).then(function (data, status){
          console.log(data.data.response);
          var comments = [];
         for (var i = 0; i < data.data.response.length; i++) {
           var comment = data.data.response[i];
           comments[i] = {};
           comments[i].userName = comment.userProfile.name;
           comments[i].profilePic = comment.userProfile.profilePic;
           comments[i].comment = comment.comment;
           comments[i].date = new Date(new Date(comment.commentTime).getTime());
         }
         return comments;
       }, function (error, status) {
         return error.data;
       })
      },



       // **** TRAVEL PLANS API ******* //


      getTravelInspirations : function () {
        return $http({
          method: 'GET',
          url: remoteAddr + '/home/travelInspirations'
        }).then(function (data, status) {
          return data.data.response;
        }, function (error, status) {
          console.log(error);
          return error.data.error;
        });
      },


      getTravelPlans : function (id) {
        return $http({
          method: 'GET',
          url: remoteAddr + '/travelplans/travelInspiration/' + id
        }).then(function (data, status) {
          return data.data.response;
        }, function (error, status) {
          return error.data.error;
        });
      },


      getTravelInspirationDetail: function(id) {
        return $http({
          method: 'GET',
          url: remoteAddr + '/travelplans/' + id
        }).then(function (data, status) {
          return data.data;
        }, function (error, status) {
          return error.data;
        })
      },


       // **** HOME PAGE API ******* //


      getInstaPhotos : function() {
        return $http({
          method: 'GET',
          url: remoteAddr + "/home/instagramPhotos"
        }).then(function (data, status) {
          return data.data.response;
        }, function (error, status) {
          return error.data.error;
        });
      },

      getHomeBlogs : function() {
        return $http({
          method: 'GET',
          url: remoteAddr + "/home/blog"
        }).then(function (data, status) {
          var posts = [];
         for (var i = 0; i < data.data.response.length; i++) {
           var post = data.data.response[i];
           posts[i] = {};
           posts[i].title = post.title;
           posts[i].author = post.user.name;
           posts[i].description = post.description;
           posts[i].imageUrl = post.imageUrl;
           posts[i].id = post.id;
           posts[i].date = new Date(new Date(post.time).getTime());
         }
         return posts;
        }, function (error, status) {
          return error.data.error;
        });
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




       // **** DESTINATION API ******* //

      getDestinationsList: function() {
        return $http({
          method: 'GET',
          url: remoteAddr + '/destination'
        }).then(function (data, status){
          return data.data;
        }, function (error, status){
          return error.data;
        })
      },

      getDestinationDetailById : function(id) {
        return $http({
          method: 'GET',
          url: remoteAddr + '/destination/' + id
        }).then(function (data, status){
          return data.data;
        }, function (error, status){
          return error.data;
        })
      },

      quickQuery : function(queryObj) {
        return $http({
          method: 'POST',
          data: queryObj,
          url: remoteAddr + '/travelplans/quickquery'
        })
      },

      shareOnFacebook : function(shareObj) {
        return $http({
          method: 'POST',
          data: shareObj,
          url: remoteAddr + '/blogs/share'
        })
      },

      shareOnGoglePlus : function(shareObj) {
        return $http({
          method: 'POST',
          data: shareObj,
          url: remoteAddr + '/blogs/google-share'
        })
      },



       // **** PLAN MY TRIP API ******* //


      submitPlanMyTripForm : function(formObj) {
        return $http({
          method: 'POST',
          data: formObj,
          headers: {
            'auth-token': auth.getToken()
          },
          url: remoteAddr + '/travelplans/query'
        })
      },


       // **** CONATACTS API ******* //

      submitContactForm : function(contactObj) {
        return $http({
          method: 'POST',
          data: contactObj,
          url: remoteAddr + "/travelplans/contactUs"
        })
      },

      submitTravelEnquiryForm : function(enquiryFormObj) {
        return $http({
          method: 'POST',
          data: enquiryFormObj,
          url: remoteAddr + "/travelplans/travelinquery"
        })
      },



       // **** SUBSCRIBE API ******* //

      submitNewsletterEmail : function(emailObj) {
        return $http({
          method: 'POST',
          data: emailObj,
          url: remoteAddr + "/newsLatter/subscribe"
        })
      }


    };
  });
