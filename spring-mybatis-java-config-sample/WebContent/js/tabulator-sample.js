var builder = new TabulatorBuilder('#sample-table');

var settings = {
	url : 'giacs311/tb-giacs311',
	columns : [
		{ 
			title: 'GL Account Code',
			width: 310,
			columns : [
				{ field: 'glAcctCategory', align: 'right', width: 31, minWidth: 20, headerSort:false },
				{ field: 'glControlAcct', align: 'right', width: 31, minWidth: 20, headerSort:false },
				{ field: 'glSubAcct1', align: 'right', width: 31, minWidth: 20, headerSort:false },
				{ field: 'glSubAcct2', align: 'right', width: 31, minWidth: 20, headerSort:false },
				{ field: 'glSubAcct3', align: 'right', width: 31, minWidth: 20, headerSort:false },
				{ field: 'glSubAcct4', align: 'right', width: 31, minWidth: 20, headerSort:false },
				{ field: 'glSubAcct5', align: 'right', width: 31, minWidth: 20, headerSort:false },
				{ field: 'glSubAcct6', align: 'right', width: 31, minWidth: 20, headerSort:false },
				{ field: 'glSubAcct7', align: 'right', width: 31, minWidth: 20,headerSort:false }
			],
			headerClick : function () {
				console.log(this.title);
			}
		},
		{ title: 'GL Account Name', field: 'glAcctName', width: 400}
	],
	options : ['filter', 'refresh'],
	rowClick : function (row) {
		console.log(row);
	}
};

builder.renderTable(settings);

$('#trigger').click(function(){
	// wwwa.tableGrid.tabulator('setData', 'get-users', {wow : 1}); // triggers ajax request; might be used for reload
	builder.reload({wow : 1});
});

//tab2.renderTable(settings);
/*
console.log('1'); 
var filtez = tab.tabulator('getFilters'); 
console.log('2');
tab.tabulator('setFilter', 'userId', '=', 'cpi'); // triggers ajax request
console.log('3');
 */