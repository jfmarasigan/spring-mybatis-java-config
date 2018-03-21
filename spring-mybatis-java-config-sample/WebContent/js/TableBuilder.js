var TableBuilder = function (boxId) {
	this.container = jQuery(boxId);
	
	this.table = null
	this.toolbar = null;
	this.pagination = null;

	this.selectedRow = null;
	this.currentPageNo = 1;
	
	this.toolbar = (function (){
		// construct toolbar
	})();
	
	this.tableContainer = (function(){
		// div for table
	})();
	
};

TableBuilder.prototype.build = function (args) {
	var jq = jQuery;
	var invalid = [null, undefined];
	
	// add tool bar div if options are available
		
	// add table div
	this.container.append('<div id="table-content"></div>');
	
	// add pagination div
	this.container.append('<div id="pagination-box"></div>')
	
	// render table on table div
	this.table = jq('#table-content');
	
	table.tabulator({
		columns : args.columns,
		paginationSize : args.rowsPerPage || 10,
		pagination : 'remote',
		ajaxFiltering : true,
		ajaxSorting : true,
		ajaxConfig : 'GET',
		ajaxURL : args.url,
		ajaxRequesting : function(url, params) {
			this.currentPageNo = params.page;
			params.start = ((params.page - 1) * params.size) + 1;
			params.end = params.page * params.size;
			// add operations before request
			return params;
		},
		ajaxResponse : function(url, params, response) {
			response.data = JSON.parse(response.data);
			return response;
		},
		ajaxError : function (xhr, textStatus, errorThrown) {
			if (args.requestError){
				args.requestError(xhr, textStatus, errorThrown);
			}
		}
	});
};