console.log($('#sample-table'));

var tab = $('#sample-table');

var paramz = {
	layout : "fitColumns",
	columns : [
		{title : 'User ID', field: 'userId'},
		{title : 'User Group', field : 'userGrp'},
		{title : 'User Name', field : 'userName'}
	],
	ajaxConfig : 'GET',
	ajaxURL : 'get-users',
	ajaxResponse : function(url, params, response) {
		response.data = JSON.parse(response.data);
		return response;
	},
	ajaxRequesting : function (url, params) {
		console.log(params);
		return params;
	},
	ajaxFiltering : true,
	ajaxSorting : true,
	pagination: 'remote',
	paginationSize : 10
};

tab.tabulator(paramz); // triggers ajax request
console.log('1');
var filtez = tab.tabulator('getFilters');
console.log('2');
tab.tabulator('setFilter', 'userId', '=', 'cpi'); // triggers ajax request
console.log('3');
tab.tabulator('setData'); // triggers ajax request; might be used for reload 

