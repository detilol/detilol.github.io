(function(){
	'use strict';
	angular
		.module('detilolSite')
		.value('gs', {
			cellfeedSchema:'http://schemas.google.com/spreadsheets/2006#cellsfeed',
			feedsHostname: 'spreadsheets.google.com',
			worksheetFeed: '/feeds/worksheets/',
			cellFeed: '/feeds/cells/',
			feedSuffix: '/public/full?alt=json'
		})
		.factory('googleSpreadsheetsService', GoogleSpreadsheetsService);
	
	GoogleSpreadsheetsService.$inject = ['$http', '$log', '$q', 'gs'];
	
	function GoogleSpreadsheetsService($http, $log, $q, gs){
		var gsData = {};
		var gsDataPromised = null;
	    var service = {	    		
	        loadData:loadData,
	        loadWorksheet:loadWorksheet,
	        getWorksheet:getWorksheet,
	        parseCells:_parseCells
	    };	    
	    return service;
	    
	    function loadData(url){	    	
	    	return $http({url:url, method:'GET'});	    	
	    }
	    
	    function loadWorksheet(worksheetId){	    	
	    	return $q(function(resolve, reject){
	    		if(gsDataPromised){
	    			return gsDataPromised;
	    		}else{
	    			gsDataPromised=getWorksheet(worksheetId)
		    			.then(function(response){
		    				return _parseWorksheet(response);
		    			})		    			
		    			.then(function(googlesheetData){
		    				resolve(googlesheetData);
		    			});
	    		}
	    	});
	    	/*
	    	return getWorksheet(worksheetId)
	    		.then(function(response){
	    			return _parseWorksheet(response);
	    		});
	    	*/	    		
	    }
	    
	    function getWorksheet(worksheetId){
	    	var url = 'http://'+gs.feedsHostname+gs.worksheetFeed+worksheetId+gs.feedSuffix;
	    	return $http({url:url, method:'GET'});
	    }
	    
	    function _parseWorksheet(response){	    	
	    	var feed = response.data.feed;
	    	$log.debug("Sheets parsing", feed);
	    	var cellRestUrls = [];
			for(var i=0; i<feed.entry.length; i++){
				var link = feed.entry[i].link;				
				for(var k=0; k<link.length; k++){
					if(link[k].rel === gs.cellfeedSchema){
						console.debug('Sheet link: ', link[k].href);
						cellRestUrls[cellRestUrls.length] = link[k].href;
						break;
					}
				}				
			}
			return _parallelLoad(cellRestUrls);
			/*
			if(cellRestUrls.length>0){
				var cellfeedUrl = cellRestUrls[1]+'?alt=json';
				//_loadSpreadsheet(cellfeedUrl);
				return $http({url:cellfeedUrl, method:'GET'});
			}else{
				throw new Error('Failed to find sheets on the specified worksheet');
			}*/
	    }
	    
	    function _parallelLoad(cellRestUrls){	    	
	    	return $q.all([
	    	     _loadSpreadsheet(cellRestUrls[0]+'?alt=json').then(_parseCells),
	    	     _loadSpreadsheet(cellRestUrls[1]+'?alt=json').then(_parseCells),
	    	])
	    	.then(function(values){
	    			console.debug("values", values);
	    			var s1 = values[0];
	    			var s2 = values[1];
	    			gsData[s1.name] = s1.table;
	    			gsData[s2.name] = s2.table;
	    			return gsData;
	    	});
	    }
	    
	    function _loadSpreadsheet(url){
	    	$log.debug("loading sheet", url);
	    	return $http({url:url, method:'GET'});
	    }
	    
	    function _parseCells(response){
	    	$log.debug('parsing', response);
	    	var feed = response.data.feed;
	    	if(!feed || !feed.entry) return;
	    	gsData = gsData || {};
			var table = [];
			var maxColumn = 0;
			var lastRow = 0;
			for(var i=0; i<feed.entry.length; i++){
				var entry = feed.entry[i];
				var rowIndex = entry.gs$cell.row-1;				
				if(lastRow+1<rowIndex){
					for(var r=lastRow+1;r<rowIndex;r++){
						table[r] = [];
					}
				}
				if(table.length<entry.gs$cell.row){
					table[rowIndex] = [];
					lastRow = rowIndex;
				}
				
				var row = table[rowIndex];
				var currentColNum = entry.gs$cell.col;
				if(currentColNum>maxColumn) maxColumn=currentColNum;
				if(row.length<maxColumn){
					for(var k=0; k<maxColumn; k++){
						row[k] = row[k] || '';
					}
				}
				var colIndex = currentColNum-1;
				row[colIndex] = entry.gs$cell.$t;
			}
			var data = {};
			data['name']=feed.title.$t;
			data['table']=table;
			return data;
	    }

	};
})();