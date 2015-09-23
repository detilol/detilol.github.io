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