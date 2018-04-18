
var TabulatorBuilder = class {
	constructor(container) {
		this.tab = jQuery(container);
		//ajax
		this.url = '';
		this.ajaxMethod = 'GET';		
		this.ajaxParams = {};
		//data
		this.pageRows = {};		
		//etc
		this.initialData = {};
		this.filters = {};
		this.requestData = {};
	}
	
	isEmptyObject(obj) {
		return Object.keys(obj).length === 0 && obj.constructor === Object;
	}
	
	createPagingInputBox (table, onenter) {
		let pageNoField = document.createElement('input');
		pageNoField.type = 'text';
		pageNoField.id = 'pager-num';
		pageNoField.style.width = '33px';
		pageNoField.onkeydown = function (event) {
			if (event.keyCode === 13 && this.value.trim() !== ''){
				onenter(table, this.value);
			}
		};
			
		return pageNoField;
	}

	createPagingInfoBox (args) {
		this.tab.find('#pager-info').remove();		
		let pageInfoBox = document.createElement('div');
		pageInfoBox.id = 'pager-info';
		pageInfoBox.style.float = 'left';
		pageInfoBox.style.clear = 'both';
		pageInfoBox.style.paddingTop = '0.45em';
		
		return pageInfoBox;
	}

	setPagingInfo (count) {
		let infoMsg = 'Showing ' + this.ajaxParams.start + ' to ' + this.ajaxParams.end + ' of '
			+ count + ' records';
		this.tab.find('#pager-info').html(infoMsg);
	}

	setNewAjaxParameters(params) {
		return params;
	}

	renderTable(settings) {
		let thisTable = this.tab;
		let util = this;
		
		this.url = settings.url;
		this.initialData = settings.data;
		
		thisTable.tabulator({
			layout : "fitColumns",
			columns : settings.columns,
			selectable : 1,
			ajaxConfig : util.ajaxMethod,
			ajaxURL : util.url,
			ajaxParams : util.initialData,
			ajaxRequesting : function(url, params) {
				params.start = ((params.page - 1) * params.size) + 1;
				params.end = params.page * params.size;
				util.ajaxParams = params;
				return params;
			},
			ajaxResponse : function(url, params, response) {
				util.setPagingInfo(response.count);	
				if (settings.responseCallback){
					return settings.responseCallback(url, params, response);
				} else {
					return response;
				}
			},
			ajaxFiltering : true,
			ajaxSorting : true,
			pagination : 'remote',
			paginationSize : settings.pageSize || 10,
			rowClick : function (e, row) {
				settings.rowClick(row, e);
			},
			rowDblClick : function (e, row){
				settings.rowDblClick(row, e);
			},
			tableBuilt : function() {
				let pagingInfo = util.createPagingInfoBox();
				let pagingInput = util.createPagingInputBox(thisTable, function (tab, value){
					tab.tabulator('setPage', parseInt(value));
				});
				
				thisTable.find('.tabulator-footer').prepend(pagingInfo);
				thisTable.find('.tabulator-pages').remove();
				jQuery(pagingInput).insertAfter('.tabulator-page[data-page="prev"]');
				
				// add toolbar here
			},
			pageLoaded : function(pageNo){
				tab.find('#pager-num').val(pageNo);
			}
		});
	}
	
	getSelectedRow() {
		let selected = this.tab.tabulator('getSelectedRows');
		let rowData = [];
		
		for (const data of selected) {
			rowData.push(data.row.data);
		}
		
		return rowData;
	}
	
	reload (addtlData, clearSort) {
		//construct data here
		let data = {};
		
		this.tab.tabulator('setData', this.url, data);
	}
	
	createToolbar () {
		var filterBtn = '<div class="dtbl-filter-btn dtbl-filter-btn-bg dtbl-toolbar-btn"><span>Filter</span></div>';
	    var refreshBtn = '<div class="dtbl-reload-btn dtbl-toolbar-btn"><span>Refresh</span></div>';
		
	    var filterMenu = '<div class="dtbl-filter-menu">' +
					        '<div style="height: 25px; width: inherit; margin: 10px 15px 10px 30px;">' +
					            '<label for="dtbl-filter-list">Filter By: </label>' +
					            '<select class="dtbl-filter-list" style="margin-right: 20px;"></select>' +
					            '<label for="dtbl-filter-entry">Keyword: </label>' +
					            '<input type="text" class="dtbl-filter-entry" autocomplete="off">' +
					        '</div>' +
					        '<div style="margin: 5px 10px; clear: both;"><button class="add-filter">Add Filter</button></div>'+
					        '<div style="margin: 10px 10px 5px 20px;">' +
					            '<span style="position: relative; bottom: 12px;">Filter Text: </span>' +
					            '<textarea class="dtbl-filter-text-list" autocomplete="off" readonly></textarea>' +
					        '</div>' +
					        '<div style="margin: 0 10px 5px 10px;">' +
					            '<button class="clear-filter" style="left: calc(100% - 190px);" disabled>Clear Filter</button>' +
					            '<button class="submit-filter" style="left: calc(100% - 180px);" >Ok</button>'+
					        '</div>' +
					    '</div>';
	    
	    var toolbar = '<div class="dtbl-toolbar">';

        if (options.indexOf('filter') !== -1){
            toolbar = toolbar + filterBtn;
            toolbar = toolbar + filterMenu;
        }
        if (options.indexOf('refresh') !== -1){
            toolbar = toolbar + refreshBtn;
        }
        toolbar = toolbar + '</div>';
        
        return toolbar;
	}
	
	addFilter () {
		
	}
	
	submitFilter () {
		if (!this.isEmptyObject(this.filters)){
			this.reload();
		}
	}
	
	clearFilter () {
		
	}
	
}

var TableHTMLFactory = class {
	constructor() {
		// empty
	}

	static CellCheckBox (cell, params) {
		let rowData = cell.cell.row.data;
		let newCbx = document.createElement('input');
		newCbx.id = params.id || '';
		newCbx.type = 'checkbox';
		newCbx.classList = params.classList || '';
		newCbx.checked = params.tagged(rowData);
		newCbx.onclick = function (event) {
			params.onClick(data, event);
		};

		return newCbx;
	}
}
