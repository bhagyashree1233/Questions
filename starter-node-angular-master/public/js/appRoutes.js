angular.module('appRoutes', [])
.config( function($routeProvider, $locationProvider) {
console.log('Hello');
	
	$routeProvider
	.when('/', {
			templateUrl: 'views/login.html',
			controller:"loginController"
		})
		.when('/question', {
			templateUrl: 'views/questions.html',
			controller:"questionController"
		});
		$locationProvider.html5Mode(true);
});