(function(){
	'user strict';
	angular.module('detilolSite')
		.controller('CarouselCtrl', CarouselCtrl);
	
	CarouselCtrl.$inject = ['$scope'];
	function CarouselCtrl($scope){
		$scope.myInterval = 5000;
		$scope.noWrapSlides = false;
		$scope.slides = [
		   {
			   image: '//placekitten.com/601/300',
			   text: 'Kitty'
		   },
		   {
			   image: '//placekitten.com/602/300',
			   text: 'Мурка'
		   },
		   {
			   image: '//placekitten.com/603/300',
			   text: 'Васька'
		   },
		];
	}
})();