angular.module('DBservice', [])

    .factory('serviceDB', function($http, $q, $rootScope, $location) {

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
            toServer: toServer
        }
    })