angular.module('DBservice', [])

    .factory('serviceDB', function($http, $q, $rootScope, $location) {
        var user = {};

        function toServer(doc2send, Url) {

            Url = "http://localhost:8080" + Url;

            var deferred = $q.defer();



            var req = {
                method: 'POST',
                url: Url,
                data: jQuery.param(doc2send),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',

                }
            }


            $http(req).then(function(res) {
                //      console.log(res);
                console.log(res);

                deferred.resolve(res);
            }, function(res) {
                //     console.log('error ');

                deferred.reject(res);
            });

            return deferred.promise;
        }

        return {
            setData :function(data){
                user.data=data;
                console.log(user.data)
            },
            getData:function(){
                return user.data
            },
            toServer: toServer
        }
    })