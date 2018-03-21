var tab = $('#sample-table');

var currentPageNo = '';
var tabulator = '';

var paramz = {
	layout : "fitColumns",
	/*selectable: 1,
	resizableRows : false,*/
	columns : [ 
		{ title : 'User ID', field : 'userId' }, 
		{ title : 'User Group', field : 'userGrp' }, 
		{ title : 'User Name', field : 'userName' }, 
		{ title : 'T', field : 'userId' } 
	],
	ajaxConfig : 'GET',
	ajaxURL : 'get-users',
	ajaxRequesting : function(url, params) {
		this.currentPage = params.page;
		params.start = ((params.page - 1) * params.size) + 1;
		params.end = params.page * params.size;
		return params;
	},
	ajaxResponse : function(url, params, response) {
		response.data = JSON.parse(response.data);
		return response;
	},
	ajaxFiltering : true,
	ajaxSorting : true,
	pagination : 'remote',
	paginationSize : 10/*,
	tableBuilt : function() {
		$('.tabulator-pages').remove();
		var ipt = document.createElement('input');
		ipt.id = 'pager-num';
		ipt.type = 'text';
		ipt.style.width = '30px';
		ipt.onkeydown = function(e) {
			if (e.keyCode === 13 && this.value !== '') {
				tab.tabulator('setPage', parseInt(this.value));
			}
		};
		$(ipt).insertAfter('.tabulator-page[data-page="prev"]');
	},
	pageLoaded : function(pageNo){
		tab.find('#pager-num').val(pageNo);
	}*/
	//paginationElement : $('#paging')
};

$('#sample-table').tabulator(paramz); // triggers ajax request

/*
console.log('1'); 
var filtez = tab.tabulator('getFilters'); 
console.log('2');
tab.tabulator('setFilter', 'userId', '=', 'cpi'); // triggers ajax request
console.log('3'); 
tab.tabulator('setData'); // triggers ajax request; might be used for reload
 */
