describe('Test JSON data format', function(){
	'user strict';
	
	var $httpBackend, $window, gsService, gs;
	
	beforeEach(function(){
		module('detilolSite', function($provide){
			$provide.value('$log', console);
		});
	});
	/*
	beforeEach(inject(function() {
	      var $injector = angular.injector(['detilolSite']);
	      mockHelloService = $injector.get('helloService');
	})); //the same as bellow 
	*/

	beforeEach(inject(function( _$httpBackend_, _$window_){		
		$httpBackend = _$httpBackend_;		
		$window = _$window_;
	}));
	beforeEach(function(){
		inject(function(_googleSpreadsheetsService_, _gs_){
			gsService = _googleSpreadsheetsService_;
			gs = _gs_;
		});	
	});
	
	describe('Google Spreadsheets', function(){	
		var gsId = '1UNXtCmrfjtByDeQNrAh6l4LVfLFaqPzb0ge7IImFA10';
		var gsFeedUrl = 'http://spreadsheets.google.com/feeds/';
		var cellFeedSchema = 'http://schemas.google.com/spreadsheets/2006#cellsfeed';
		var cellfeedUrl;
		it('All components loaded', function(){
			expect(angular.module('detilolSite')).toBeDefined();
			expect(gsService).toBeDefined();	
			expect($httpBackend).toBeDefined();
		});
		
		it('load worksheets', function(){
			var testUrl = gsFeedUrl +'worksheets/'+gsId+'/public/full?alt=json';
			var response = {"version":"1.0","encoding":"UTF-8","feed":{"xmlns":"http://www.w3.org/2005/Atom","xmlns$openSearch":"http://a9.com/-/spec/opensearchrss/1.0/","xmlns$gs":"http://schemas.google.com/spreadsheets/2006","id":{"$t":"https://spreadsheets.google.com/feeds/worksheets/1UNXtCmrfjtByDeQNrAh6l4LVfLFaqPzb0ge7IImFA10/public/full"},"updated":{"$t":"2015-09-28T09:45:34.287Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#worksheet"}],"title":{"type":"text","$t":"test1"},"link":[{"rel":"alternate","type":"application/atom+xml","href":"https://docs.google.com/a/itranga.com/spreadsheets/d/1UNXtCmrfjtByDeQNrAh6l4LVfLFaqPzb0ge7IImFA10/pubhtml"},{"rel":"http://schemas.google.com/g/2005#feed","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/worksheets/1UNXtCmrfjtByDeQNrAh6l4LVfLFaqPzb0ge7IImFA10/public/full"},{"rel":"http://schemas.google.com/g/2005#post","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/worksheets/1UNXtCmrfjtByDeQNrAh6l4LVfLFaqPzb0ge7IImFA10/public/full"},{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/worksheets/1UNXtCmrfjtByDeQNrAh6l4LVfLFaqPzb0ge7IImFA10/public/full?alt\u003djson"}],"author":[{"name":{"$t":"club"},"email":{"$t":"club@itranga.com"}}],"openSearch$totalResults":{"$t":"1"},"openSearch$startIndex":{"$t":"1"},"entry":[{"id":{"$t":"https://spreadsheets.google.com/feeds/worksheets/1UNXtCmrfjtByDeQNrAh6l4LVfLFaqPzb0ge7IImFA10/public/full/od6"},"updated":{"$t":"2015-09-28T09:45:34.287Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#worksheet"}],"title":{"type":"text","$t":"Sheet1"},"content":{"type":"text","$t":"Sheet1"},"link":[{"rel":"http://schemas.google.com/spreadsheets/2006#listfeed","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1UNXtCmrfjtByDeQNrAh6l4LVfLFaqPzb0ge7IImFA10/od6/public/full"},{"rel":"http://schemas.google.com/spreadsheets/2006#cellsfeed","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/cells/1UNXtCmrfjtByDeQNrAh6l4LVfLFaqPzb0ge7IImFA10/od6/public/full"},{"rel":"http://schemas.google.com/visualization/2008#visualizationApi","type":"application/atom+xml","href":"https://docs.google.com/a/itranga.com/spreadsheets/d/1UNXtCmrfjtByDeQNrAh6l4LVfLFaqPzb0ge7IImFA10/gviz/tq?gid\u003d0\u0026pub\u003d1"},{"rel":"http://schemas.google.com/spreadsheets/2006#exportcsv","type":"text/csv","href":"https://docs.google.com/a/itranga.com/spreadsheets/d/1UNXtCmrfjtByDeQNrAh6l4LVfLFaqPzb0ge7IImFA10/export?gid\u003d0\u0026format\u003dcsv"},{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/worksheets/1UNXtCmrfjtByDeQNrAh6l4LVfLFaqPzb0ge7IImFA10/public/full/od6"}],"gs$colCount":{"$t":"26"},"gs$rowCount":{"$t":"1001"}}]}};
			$httpBackend.expectGET(testUrl).respond(200, response);
			gsService.loadData(testUrl).then(testResult);
			$httpBackend.flush();
			
			function testResult(response){
				var result = response.data;
				expect(result).toBeDefined();
				expect(result.feed).toBeDefined();
				expect(result.feed.entry).toBeDefined();				
				var feed = result.feed;
				expect(feed).toBeDefined();
				expect(feed.entry).toBeDefined();
				for(var i=0; i<feed.entry.length; i++){
					var links = feed.entry[i].link;
					var cellRestUrl = null;
					for(var k=0; k<links.length; k++){
						if(links[k].rel === cellFeedSchema){
							cellRestUrl = links[k].href;
						}
					}
					expect(cellRestUrl).not.toBe(null);
					cellfeedUrl = cellRestUrl+'?alt=json';
				}				
			}
			
		});
		
		it('load cellfeed', function(){
			
			expect(cellfeedUrl).toBeDefined();
			loadSpreadsheet(cellfeedUrl);
			
			function loadSpreadsheet(url){
				var urlParser = $window.document.createElement('a');
				urlParser.href = url;
				expect(urlParser.protocol).toMatch(/http/);
				expect(urlParser.hostname).toEqual('spreadsheets.google.com');
				var cellfeedResponse = {"version":"1.0","encoding":"UTF-8","feed":{"xmlns":"http://www.w3.org/2005/Atom","xmlns$openSearch":"http://a9.com/-/spec/opensearchrss/1.0/","xmlns$batch":"http://schemas.google.com/gdata/batch","xmlns$gs":"http://schemas.google.com/spreadsheets/2006","id":{"$t":"https://spreadsheets.google.com/feeds/cells/1UNXtCmrfjtByDeQNrAh6l4LVfLFaqPzb0ge7IImFA10/od6/public/full"},"updated":{"$t":"2015-09-28T09:45:34.287Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#cell"}],"title":{"type":"text","$t":"Sheet1"},"link":[{"rel":"alternate","type":"application/atom+xml","href":"https://docs.google.com/a/itranga.com/spreadsheets/d/1UNXtCmrfjtByDeQNrAh6l4LVfLFaqPzb0ge7IImFA10/pubhtml"},{"rel":"http://schemas.google.com/g/2005#feed","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/cells/1UNXtCmrfjtByDeQNrAh6l4LVfLFaqPzb0ge7IImFA10/od6/public/full"},{"rel":"http://schemas.google.com/g/2005#post","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/cells/1UNXtCmrfjtByDeQNrAh6l4LVfLFaqPzb0ge7IImFA10/od6/public/full"},{"rel":"http://schemas.google.com/g/2005#batch","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/cells/1UNXtCmrfjtByDeQNrAh6l4LVfLFaqPzb0ge7IImFA10/od6/public/full/batch"},{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/cells/1UNXtCmrfjtByDeQNrAh6l4LVfLFaqPzb0ge7IImFA10/od6/public/full?alt\u003djson"}],"author":[{"name":{"$t":"club"},"email":{"$t":"club@itranga.com"}}],"openSearch$totalResults":{"$t":"11"},"openSearch$startIndex":{"$t":"1"},"gs$rowCount":{"$t":"1001"},"gs$colCount":{"$t":"26"},"entry":[{"id":{"$t":"https://spreadsheets.google.com/feeds/cells/1UNXtCmrfjtByDeQNrAh6l4LVfLFaqPzb0ge7IImFA10/od6/public/full/R1C1"},"updated":{"$t":"2015-09-28T09:45:34.287Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#cell"}],"title":{"type":"text","$t":"A1"},"content":{"type":"text","$t":"Возраст"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/cells/1UNXtCmrfjtByDeQNrAh6l4LVfLFaqPzb0ge7IImFA10/od6/public/full/R1C1"}],"gs$cell":{"row":"1","col":"1","inputValue":"Возраст","$t":"Возраст"}},{"id":{"$t":"https://spreadsheets.google.com/feeds/cells/1UNXtCmrfjtByDeQNrAh6l4LVfLFaqPzb0ge7IImFA10/od6/public/full/R1C2"},"updated":{"$t":"2015-09-28T09:45:34.287Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#cell"}],"title":{"type":"text","$t":"B1"},"content":{"type":"text","$t":"Пн"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/cells/1UNXtCmrfjtByDeQNrAh6l4LVfLFaqPzb0ge7IImFA10/od6/public/full/R1C2"}],"gs$cell":{"row":"1","col":"2","inputValue":"Пн","$t":"Пн"}},{"id":{"$t":"https://spreadsheets.google.com/feeds/cells/1UNXtCmrfjtByDeQNrAh6l4LVfLFaqPzb0ge7IImFA10/od6/public/full/R1C3"},"updated":{"$t":"2015-09-28T09:45:34.287Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#cell"}],"title":{"type":"text","$t":"C1"},"content":{"type":"text","$t":"Вт"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/cells/1UNXtCmrfjtByDeQNrAh6l4LVfLFaqPzb0ge7IImFA10/od6/public/full/R1C3"}],"gs$cell":{"row":"1","col":"3","inputValue":"Вт","$t":"Вт"}},{"id":{"$t":"https://spreadsheets.google.com/feeds/cells/1UNXtCmrfjtByDeQNrAh6l4LVfLFaqPzb0ge7IImFA10/od6/public/full/R1C4"},"updated":{"$t":"2015-09-28T09:45:34.287Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#cell"}],"title":{"type":"text","$t":"D1"},"content":{"type":"text","$t":"Ср"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/cells/1UNXtCmrfjtByDeQNrAh6l4LVfLFaqPzb0ge7IImFA10/od6/public/full/R1C4"}],"gs$cell":{"row":"1","col":"4","inputValue":"Ср","$t":"Ср"}},{"id":{"$t":"https://spreadsheets.google.com/feeds/cells/1UNXtCmrfjtByDeQNrAh6l4LVfLFaqPzb0ge7IImFA10/od6/public/full/R1C5"},"updated":{"$t":"2015-09-28T09:45:34.287Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#cell"}],"title":{"type":"text","$t":"E1"},"content":{"type":"text","$t":"Чт"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/cells/1UNXtCmrfjtByDeQNrAh6l4LVfLFaqPzb0ge7IImFA10/od6/public/full/R1C5"}],"gs$cell":{"row":"1","col":"5","inputValue":"Чт","$t":"Чт"}},{"id":{"$t":"https://spreadsheets.google.com/feeds/cells/1UNXtCmrfjtByDeQNrAh6l4LVfLFaqPzb0ge7IImFA10/od6/public/full/R1C6"},"updated":{"$t":"2015-09-28T09:45:34.287Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#cell"}],"title":{"type":"text","$t":"F1"},"content":{"type":"text","$t":"Пт"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/cells/1UNXtCmrfjtByDeQNrAh6l4LVfLFaqPzb0ge7IImFA10/od6/public/full/R1C6"}],"gs$cell":{"row":"1","col":"6","inputValue":"Пт","$t":"Пт"}},{"id":{"$t":"https://spreadsheets.google.com/feeds/cells/1UNXtCmrfjtByDeQNrAh6l4LVfLFaqPzb0ge7IImFA10/od6/public/full/R2C2"},"updated":{"$t":"2015-09-28T09:45:34.287Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#cell"}],"title":{"type":"text","$t":"B2"},"content":{"type":"text","$t":"asdf"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/cells/1UNXtCmrfjtByDeQNrAh6l4LVfLFaqPzb0ge7IImFA10/od6/public/full/R2C2"}],"gs$cell":{"row":"2","col":"2","inputValue":"asdf","$t":"asdf"}},{"id":{"$t":"https://spreadsheets.google.com/feeds/cells/1UNXtCmrfjtByDeQNrAh6l4LVfLFaqPzb0ge7IImFA10/od6/public/full/R4C1"},"updated":{"$t":"2015-09-28T09:45:34.287Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#cell"}],"title":{"type":"text","$t":"A4"},"content":{"type":"text","$t":"asdf"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/cells/1UNXtCmrfjtByDeQNrAh6l4LVfLFaqPzb0ge7IImFA10/od6/public/full/R4C1"}],"gs$cell":{"row":"4","col":"1","inputValue":"asdf","$t":"asdf"}},{"id":{"$t":"https://spreadsheets.google.com/feeds/cells/1UNXtCmrfjtByDeQNrAh6l4LVfLFaqPzb0ge7IImFA10/od6/public/full/R4C3"},"updated":{"$t":"2015-09-28T09:45:34.287Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#cell"}],"title":{"type":"text","$t":"C4"},"content":{"type":"text","$t":"8"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/cells/1UNXtCmrfjtByDeQNrAh6l4LVfLFaqPzb0ge7IImFA10/od6/public/full/R4C3"}],"gs$cell":{"row":"4","col":"3","inputValue":"\u003d3+5","numericValue":"8.0","$t":"8"}},{"id":{"$t":"https://spreadsheets.google.com/feeds/cells/1UNXtCmrfjtByDeQNrAh6l4LVfLFaqPzb0ge7IImFA10/od6/public/full/R5C1"},"updated":{"$t":"2015-09-28T09:45:34.287Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#cell"}],"title":{"type":"text","$t":"A5"},"content":{"type":"text","$t":"sadf"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/cells/1UNXtCmrfjtByDeQNrAh6l4LVfLFaqPzb0ge7IImFA10/od6/public/full/R5C1"}],"gs$cell":{"row":"5","col":"1","inputValue":"sadf","$t":"sadf"}},{"id":{"$t":"https://spreadsheets.google.com/feeds/cells/1UNXtCmrfjtByDeQNrAh6l4LVfLFaqPzb0ge7IImFA10/od6/public/full/R5C3"},"updated":{"$t":"2015-09-28T09:45:34.287Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#cell"}],"title":{"type":"text","$t":"C5"},"content":{"type":"text","$t":"asdfasd"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/cells/1UNXtCmrfjtByDeQNrAh6l4LVfLFaqPzb0ge7IImFA10/od6/public/full/R5C3"}],"gs$cell":{"row":"5","col":"3","inputValue":"asdfasd","$t":"asdfasd"}}]}};
				console.log(url);				
				$httpBackend.expectGET(cellfeedUrl).respond(200, cellfeedResponse);				
				gsService.loadData(url).then(parseSpreadsheet);				
				$httpBackend.flush();
			}
			
			function parseSpreadsheet(response){
				var result = response.data;
				expect(result).toBeDefined();
				expect(result.feed).toBeDefined();
				expect(result.feed.entry).toBeDefined();				
				var feed = result.feed;
				expect(feed).toBeDefined();
				expect(feed.entry).toBeDefined();
				var table = [];
				var maxColumn = 0;
				for(var i=0; i<feed.entry.length; i++){
					var entry = feed.entry[i];
					var rowIndex = entry.gs$cell.row-1;
					if(table.length<entry.gs$cell.row){
						table[rowIndex] = [];
					}
					var row = table[rowIndex];
					var currentColNum = entry.gs$cell.col;
					if(currentColNum>maxColumn) maxColumn=currentColNum;
					if(row.length<currentColNum){
						for(var k=row.length; k<currentColNum; k++){
							row[k] = row[k] || null;
						}
					}
					var colIndex = currentColNum-1;
					row[colIndex] = entry.gs$cell.$t;
				}				
				expect(table.length).toEqual(5);
				console.log(table);
			}
			
		});		
	});
});