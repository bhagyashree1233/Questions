angular.module('appRoutes', [])
.config( function($routeProvider, $locationProvider) {
console.log('Hello');
	
	$routeProvider
	.when('/', {
			templateUrl: 'views/menuQuestion.html',
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
		.when('/admin',{
			templateUrl: 'views/admin.html',
			controller:"adminController"
		})
		;
		$locationProvider.html5Mode(true);
});