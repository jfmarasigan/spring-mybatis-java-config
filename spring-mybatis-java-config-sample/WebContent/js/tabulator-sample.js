var tab = $('#sample-table');

var currentPageNo = '';
var tabulator = '';

var cbxGen = function (cell, args) {
	let data = cell.cell.row.data;
	let cbx = document.createElement('input');
	cbx.type = 'checkbox';
	cbx.checked = args.isChecked(data);
	cbx.onclick = function (){
		args.fnTag(data);
	};
	
	return cbx;
}

var paramz = {
	layout : "fitColumns",
	/*selectable: 1,
	resizableRows : false,*/
	columns : [ 
		{ 
			title : 'T', 
			field : 'userId',
			width : '20',
			formatter: function (cell, formatterParams) {
				return cbxGen(cell, {
					isChecked : function (data) {
						return data.userId === null;
					},
					fnTag : function(data){
						console.log(data);
					}
				});
			} 
		},
		{ title : 'User ID', field : 'userId' }, 
		{ title : 'User Group', field : 'userGrp' }, 
		{ title : 'User Name', field : 'userName' }
	],
	ajaxConfig : 'GET',
	ajaxURL : 'get-users',
	ajaxRequesting : function(url, params) {
		this.currentPage = params.page;
		params.start = ((params.page - 1) * params.size) + 1;
		params.end = params.page * params.size;
		return params;
	},
	ajaxFiltering : true,
	ajaxSorting : true,
	pagination : 'remote',
	paginationSize : 10,
	selectable : 1,
	tableBuilt : function() {
		tab.find('.tabulator-pages').remove();
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
	}
	//paginationElement : $('#paging')
};

//$('#sample-table').tabulator(paramz); // triggers ajax request

var wwwa = new TabulatorBuilder('#sample-table');

wwwa.renderTable({
	url : 'get-users',	
	columns : [ 
		{ 
			title : 'T', 
			field : 'userId',
			width : '20',
			formatter: function (cell, formatterParams) {
				return cbxGen(cell, {
					isChecked : function (data) {
						return data.userId === null;
					},
					fnTag : function(data){
						console.log(data);
					}
				});
			} 
		},
		{ title : 'User ID', field : 'userId' }, 
		{ title : 'User Group', field : 'userGrp' }, 
		{ title : 'User Name', field : 'userName' }
	]
});

$('#trigger').click(function(){
	tab.tabulator('setData', 'get-users', {wow : 1}); // triggers ajax request; might be used for reload
});

/*
console.log('1'); 
var filtez = tab.tabulator('getFilters'); 
console.log('2');
tab.tabulator('setFilter', 'userId', '=', 'cpi'); // triggers ajax request
console.log('3');
 */