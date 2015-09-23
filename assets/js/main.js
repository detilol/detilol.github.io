;(function(){
	'user strict';
	angular.module('detilolSite', ['ui.router', 'ui.bootstrap', 'ngAnimate'])
		.controller('PageCtrl', PageCtrl)
		.controller('BlogCtrl', BlogCtrl)
		.constant('L', L)
		.config(config);
	
	config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

	PageCtrl.$inject = ['$scope', 'BLOBS'];

/**
 * Configure the Routes
 */
function config($stateProvider, $urlRouterProvider, $locationProvider) {
	
	$urlRouterProvider.otherwise('/404');
	
	$stateProvider
		.state('home', {url:'/', templateUrl: 'partials/home.html', controller: 'PageCtrl'})		
		.state('about', {url:'/about', templateUrl: 'partials/about.html', controller: 'PageCtrl'})
		.state('klasses', {url:'/klasses', templateUrl: 'partials/klasses.html', controller: 'PageCtrl'})
		.state('childcare', {url:'/childcare', templateUrl: 'partials/childcare.html', controller: 'PageCtrl'})
		.state('pricing', {url:'/pricing', templateUrl: 'partials/pricing.html', controller: 'PageCtrl'})
		.state('contact', {url:'/contact', templateUrl: 'partials/contact.html', controller: 'MapCtrl'})
		.state('404', {url:'/404', templateUrl: 'partials/404.html', controller: 'PageCtrl'});
	
		/*
  $routeProvider
    
    .when("/", {templateUrl: "partials/home.html", controller: "PageCtrl"})

    .when("/about", {templateUrl: "partials/about.html", controller: "PageCtrl"})
    .when("/faq", {templateUrl: "partials/faq.html", controller: "PageCtrl"})
    .when("/pricing", {templateUrl: "partials/pricing.html", controller: "PageCtrl"})
    .when("/services", {templateUrl: "partials/services.html", controller: "PageCtrl"})
    .when("/contact", {templateUrl: "partials/contact.html", controller: "PageCtrl"})
    
    .when("/blog", {templateUrl: "partials/blog.html", controller: "BlogCtrl"})
    .when("/blog/post", {templateUrl: "partials/blog_item.html", controller: "BlogCtrl"})
    
    .otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrl"});
    */
    $locationProvider.html5Mode({
        enabled:true,
        requireBase: true
    });

    $locationProvider.hashPrefix('!');
      
    // Don't strip trailing slashes from calculated URLs
    //  $resourceProvider.defaults.stripTrailingSlashes = false;
};

/**
 * Controls the Blog
 */
function BlogCtrl() {
  console.log("Blog Controller reporting for duty.");
};

/**
 * Controls all other Pages
 * @param $scope
 * @param BLOBS constant links to BLOB resources (images, video) whether in cloud or local
 */
function PageCtrl($scope, BLOBS) {
  $scope.blobs = BLOBS;
  /*
  // Activates the Carousel
  $('.carousel').carousel({
    interval: 5000
  });
  // Activates Tooltips for Social Links
  $('.tooltip-social').tooltip({
    selector: "a[data-toggle=tooltip]"
  })
  */
}


})();