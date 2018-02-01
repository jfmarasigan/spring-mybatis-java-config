//jQuery(document).ready(function (){ 
	// use .ready if you want your .js file placed above the whole html document, 
	// just be sure that DataTableBuilder.js and the whole html document is loaded before doing anything
	var testDT = new DataTableBuilder('#container', null);
	
	testDT.renderTable({
		id: 'table-test',
		columns: [
			{ data: 'userId', header : 'User ID' },
			{ data: 'userGroup', header : 'User Group' },
			{ data: 'userName', header : 'User Name' },
		],
		options: ['filter', 'refresh'],
		enableMultiSelection
	});
//});