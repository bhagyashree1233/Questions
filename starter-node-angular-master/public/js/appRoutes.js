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
		})
		.when('/user', {
			templateUrl: 'views/user.html',
			controller:"userController"
		})
		
		;
		$locationProvider.html5Mode(true);
});