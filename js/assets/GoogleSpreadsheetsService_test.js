describe('Test JSON data format', function(){
	'user strict';
	
	var $window, gsService, gs, httpReal;
	
	beforeEach(function(){
		module('detilolSite', function($provide){
			$provide.value('$log', console);
		});
		module('httpReal');
	});
	/*
	beforeEach(inject(function() {
	      var $injector = angular.injector(['detilolSite']);
	      mockHelloService = $injector.get('helloService');
	})); //the same as bellow 
	*/

	beforeEach(inject(function(_$window_){		
		$window = _$window_;
	}));
	beforeEach(function(){
		inject(function(_googleSpreadsheetsService_, _gs_, _httpReal_){
			gsService = _googleSpreadsheetsService_;
			gs = _gs_;
			httpReal = _httpReal_;
		});	
	});
		
	describe('real worksheets', function(){
		var worksheetId = '1UNXtCmrfjtByDeQNrAh6l4LVfLFaqPzb0ge7IImFA10';
		it('Load worksheet', function(){
			expect(angular.module('detilolSite')).toBeDefined();
			expect(gsService).toBeDefined();
			gsService.getWorksheet(worksheetId)
				.then(function(response){
					expect(response).toBeNull();
				});
			httpReal.submit();
		});
	});
});