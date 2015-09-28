;(function(){
	'user strict';
	
	angular.module('detilolSite')
		.directive('googleSheet', ['googleSpreadsheetsService', function(googleSpreadsheetsService){
		
		//var gsData = {"Познавашки":[['hello', 'world']], "Развивашки":[['Привет', 'мир!']]}; 
		var directive = {
			restrict: 'AE',
			transclude:true,
			scope:{
				worksheet:'@',
				sheet:'@'
			},			
			link:link
		};
		
		return directive;
		
		function link(scope, element, attrs, controller, transclude){
			googleSpreadsheetsService.loadWorksheet(scope.worksheet)
				.then(function(gsData){
					//var gsData = googleSpreadsheetsService.parseCells(response);
					scope.table = gsData[scope.sheet];
					transclude(scope, function(clone, scope) {
				        element.append(clone);
				     });
					console.debug('sheet data for ', scope.sheet,'is', scope.table);
				});			
		}
		
		
	}]);
})();