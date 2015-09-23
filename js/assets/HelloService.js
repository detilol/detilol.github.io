(function(){
	'use strict';
	angular
		.module('detilolSite')
		.factory('helloService', HelloService);
	
	function HelloService(){
		var service = {
			sayHello : sayHello
		};
		return service;
		
		function sayHello(){
			return 'Hello world!';
		}
	      
	};
})();