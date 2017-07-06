angular.module('DBservice', [])

.factory('serviceDB', function($http, $q, authentication, $rootScope, $location) {
   
  function toServer(doc2send, Url) {

  Url = "http://localhost:8080"+Url;

    var deferred = $q.defer();

    

    var req =              
    {  
      method: 'GET',
      url: Url,
      
      headers: 
      {
        'Content-Type': 'application/x-www-form-urlencoded',
       
      }
    }   

        
     $http(req).then(function(res) {
  //      console.log(res);
            
       deferred.resolve(res);
     },function(res) {
  //     console.log('error ');
         
       deferred.reject(res);
    });

    return deferred.promise;
  }

  function login(doc2send, Url) {

  Url = "http://www.uttamtelecom.com"+Url;
  
  //  console.log(Url);
  //  console.log('entered login service func....');
    var deferred = $q.defer();  
    var req =              
    {  
      method: 'POST',
      url: Url,
      data: jQuery.param(doc2send), 
      headers: 
      {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }   

       $rootScope.loadingImg = true;        
     $http(req).then(function(res) {
     //  console.log(res.data);
       if(res.data.done) {
          authentication.saveToken(res.data.token);  
       }
        $rootScope.loadingImg = false;    
       deferred.resolve(res); 
     },function(res) { 
        $rootScope.loadingImg = false;    
   //    console.log('error ');
       deferred.reject(res);
    });

    return deferred.promise;
  }

  return {
      toServer : toServer,
      login : login
  } 
})

.factory('authentication', function($window) {

    function saveToken(token) {
      $window.localStorage['auth-token'] = token;
    };

    function getToken() {
      return $window.localStorage['auth-token'];
    };

    function logout() {
      $window.localStorage.removeItem('auth-token');
    };

    function isLoggedIn () {
      var token = getToken();
   //   console.log(token);
      var payload;

      if(token){
        payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);

         return payload.exp > Date.now() / 1000;
      } else {
         return false;
      }
    };

     function currentUser() {
      if(isLoggedIn()){
        var token = getToken();
        var payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);

   //     console.log(payload);
      
       return {
        userId : payload.userId,
        locationUrl : payload.locationUrl
       };
      }
     };

    return {
      saveToken : saveToken,
      getToken : getToken,
      logout : logout,
      isLoggedIn : isLoggedIn,
      currentUser : currentUser
    };
  
})