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
		.when('/admin',{
			templateUrl: 'views/admin.html',
			controller:"adminController"
		})
		.when('/question',{
			templateUrl: 'views/question.html',
			controller:"userController"
		}).when('/addQuestion', {
			templateUrl: 'views/addQuestions.html',
			controller:"questionController"
		}).when('/instructions',{
templateUrl: 'views/instructions.html',
controller:"userController"
		}).when('/createUser',{
templateUrl: 'views/createUser.html',
controller:"loginController"
		})
		;
		$locationProvider.html5Mode(true);
});