//jQuery(document).ready(function (){ 
// use .ready if you want your .js file placed above the whole html document, 
// just be sure that DataTableBuilder.js and the whole html document is loaded before doing anything
var testDT = new DataTableBuilder('#container', null);

testDT.renderTable({
	id: 'table-test',
	url: 'get-all',
	data : {},
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
});

testDT.enableRowHighlight(function (rows){
	var text = document.getElementById('text');
	for (var i = 0; i < rows.length; i++){
		text.innerHTML = JSON.stringify(rows[i]) + ' ' + '<br/>' ;
	}
});
//});