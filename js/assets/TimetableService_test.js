describe('Test JSON data format', function(){
	'user strict';
	
	var $httpBackend, $log, helloService;
	
	beforeEach(function(){
		
	});
	
	beforeEach(function(){
		module('detilolSite')
	});
	/*
	beforeEach(inject(function() {
	      var $injector = angular.injector(['detilolSite']);
	      mockHelloService = $injector.get('helloService');
	})); //the same as bellow 
	*/
	
	beforeEach(inject(function(_$log_, _$httpBackend_){
		$log = _$log_;
		$httpBackend = _$httpBackend_;		
	}));
	beforeEach(function(){
		inject(function(_helloService_, _timetableService_){
			helloService = _helloService_;
			timetableService = _timetableService_;
		});	
	});
	
	describe('Timetable', function(){		
		it('All components loaded', function(){
			expect(angular.module('detilolSite')).toBeDefined();
			expect(helloService).toBeDefined();
			expect(helloService.sayHello()).toEqual('Hello world!');
			expect(timetableService).toBeDefined();
			//var timeTable = angular.fromJson(json);
			//expext(timeTable.poznavashki).toBeDefined();
		});
		
		it('Load JSON - OK', function(){
			var testUrl = 'http://example.com/data/timetable';			
			$httpBackend.expectGET(testUrl).respond(200, {
				"poznavashki":[
				       	    {
				       	    	"rowLabel":"1—1,5",
				       	    	"data":[
				       	    	        {"3":"9:30—10:30"},
				       	    	        {"5":"9:30—10:30"}
				       	    	 ]				       	    		
				       	    },
				       	    {
				       	    	"rowLabel":"1,5—2",
				       	    	"data":[
				       	    	        {"1":"11:30—12:30"},
				       	    	        {"4":"11:30—12:30"}
				       	    	 ]
				       	    },
				       	    {
				       	    	"rowLabel":"2—2,5",
				       	    	"data":[
				       	    	        {"2":"9:30—10:30"},
				       	    	        {"4":"9:30—10:30"}
				       	    	 ]
				       	    },
				       	    {
				       	    	"rowLabel":"2,5—3",
				       	    	"data":[
				       	    	        {"2":"11:30—12:30"},
				       	    	        {"5":"11:30—12:30"}
				       	    	 ]
				       	    }	    
				       	]
			});
			
			timetableService.getData(testUrl)
				.then(testResult);
			$httpBackend.flush();
			function testResult(response){
				var result = response.data;
				expect(result).toBeDefined();
				console.log(result);
				expect(result.poznavashki).toBeDefined();
				expect(result.poznavashki.length).toBeGreaterThan(0);
			}
		});
	});
});