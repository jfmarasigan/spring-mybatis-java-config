//jQuery(document).ready(function (){ 
// use .ready if you want your .js file placed above the whole html document, 
// just be sure that DataTableBuilder.js and the whole html document is loaded before doing anything
var $qs = document.querySelector.bind(document);

var testDT = new DataTableBuilder('#container', null);

testDT.renderTable({
	id: 'table-test',
	url: 'get-all',
	data : {
		test: 100,
		wow: 'lol'
	},
	columns: [
		{ 
			data: 'userId', 
			colHeader : 'User ID'/*,
			width: '10%',
			render : function (data, type, row){					
				return '<input type="checkbox" checked disabled/>';
			}*/
		},
		{ data: 'userGrp', colHeader : 'User Group' },
		{ data: 'userName', colHeader : 'User Name' },
	],
	options: ['filter', 'refresh'],
	columnDefs : [
		{ className: 'dt-center', targets : [0] }
	],
	select: 'multiple',
	vScrollLimit : '240px',
	collapse : false
});

testDT.enableRowHighlight(function (rows){
	var text = document.getElementById('text');
	for (var i = 0; i < rows.length; i++){
		text.innerHTML = JSON.stringify(rows[i]) + ' ' + '<br/>' ;
	}
});
/*
var testDT2 = new DataTableBuilder('#container2', null);

testDT2.renderTable({
	id: 'table-test2',
	url: 'get-all',
	data : {
		test: 100,
		wow: 'lol'
	},
	columns: [
		{ 
			data: 'userId', 
			colHeader : 'User ID',
			width: '10%',
			render : function (data, type, row){					
				return '<input type="checkbox" checked disabled/>';
			}
		},
		{ data: 'userGrp', colHeader : 'User Group' },
		{ data: 'userName', colHeader : 'User Name' },
	],
	options: ['filter', 'refresh'],
	columnDefs : [
		{ className: 'dt-center', targets : [0] }
	],
	select: 'single'
});*/
//});