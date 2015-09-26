;(function(){
	'user strict';
	angular.module('detilolSite', ['ui.router', 'ui.bootstrap', 'ngAnimate'])
		.controller('PageCtrl', PageCtrl)
		.controller('BlogCtrl', BlogCtrl)
		.constant('L', L)
		.config(config);
	
	config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

	PageCtrl.$inject = ['$scope', 'BLOBS', 'timetableService'];

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
function PageCtrl($scope, BLOBS, timetableService) {
  $scope.blobs = BLOBS;
  $scope.timetable = timetableService.getTimetable();
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
;(function(){
	'user strict';
	angular.module('detilolSite')
		.controller('MapCtrl', MapCtrl);
	
	MapCtrl.$inject = ['L'];
	function MapCtrl(L){
		//var map = L.map('map').setView([55, 37], 13);
	/*
		L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IjZjNmRjNzk3ZmE2MTcwOTEwMGY0MzU3YjUzOWFmNWZhIn0.Y8bhBaUMqFiPrDRW9hieoQ', {
			maxZoom: 18,
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
				'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
				'Imagery © <a href="http://mapbox.com">Mapbox</a>',
			id: 'mapbox.streets'
		}).addTo(map);
	
		L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(map);
	
		L.marker([55.8234706794, 37.3707702755]).addTo(map)
			.bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();
	
		
		var popup = L.popup();
	
		function onMapClick(e) {
			popup
				.setLatLng(e.latlng)
				.setContent("You clicked the map at " + e.latlng.toString())
				.openOn(map);
		}
	
		map.on('click', onMapClick);
	*/
		 var myMap = L.map('map', {scrollWheelZoom: true, zoomControl: false});
		  var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
		  var osmAttrib = 'Map data © OpenStreetMap contributors';
		  var osm = new L.TileLayer(osmUrl, {minZoom: 0, maxZoom: 20, attribution: osmAttrib});
		  myMap.setView(new L.LatLng(55.8234706794, 37.3707702755), 15);
		  myMap.addLayer(osm);
		  myMap.addControl(L.control.zoom({position: 'bottomleft'}));
		  
		  var greenIcon = L.icon({
			    iconUrl: '../img/leaf-green.png',
			    shadowUrl: '../img/leaf-shadow.png',
	
			    iconSize:     [38, 95], // size of the icon
			    shadowSize:   [50, 64], // size of the shadow
			    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
			    shadowAnchor: [4, 62],  // the same for the shadow
			    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
			});
		  
		  //55.8234706794, 37.3707702755
		  L.marker([55.8234, 37.37078], {icon:greenIcon}).addTo(myMap)
			.bindPopup("<strong>&#x263a; Улыбашки!</strong>", {closeButton:false}).openPopup();
	}
})();
(function(){
	'use strict';
	angular
		.module('detilolSite')
		.factory('timetableService', TimetableService);
	
	TimetableService.$inject = ['$http', '$log', '$q'];
	
	function TimetableService($http, $log, $q){
		var data = null;
	    var service = {	    		
	        getData: getData,
	        getTimetable: getTimetable
	    };
		
		getData('/data/timetable.json').then(function(response){
			data = response.data;
		});
		
	    return service;
	    /**
	     * @param url http get URL
	     * @return promise
	     */
	    function getData(url){
	    	if(!url){
	    		var promise = $q(function(resolve, reject){
	    			setTimeout(function(){
	    				var errorData = {data:{message:{title:'Not found', text:'URL is not defined'}}, status:404};
		    			reject(errorData);
	    			}, 0);	    			
	    		});
	    		return promise;
	    	}
	    	return $http.get(url);	    	
	    }
	    
	    function getTimetable(){
	    	return data;
	    }
	};
})();