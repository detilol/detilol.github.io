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