//jQuery(document).ready(function (){ 
// use .ready if you want your .js file placed above the whole html document, 
// just be sure that DataTableBuilder.js and the whole html document is loaded before doing anything
var $qs = document.querySelector.bind(document);

var testDT = new DataTableBuilder('#container', '#table-test');

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
			colHeader : '&nbsp;&nbsp;&nbsp;&nbsp;T',
			width: '13px',
			orderable: false,
			//tagOption : 'display',
			render : function (data, type, row){
				//return '<input type="checkbox" class="dt-tags" disabled ' +  (data !== '' ? ' checked ' : '') + '/>';
				var cbx = new DataTableBuilder.CellCheckBox({
					identifier: 'tag-abcd', 
					editable: true, 
					setChecked : function (d) {
						return d === 'LTOLEN';
					}
				});
				
				return cbx.construct(data);				
			},
			tagOnClick : function (row){
				console.log(row);
			}
		},
		{ data: 'userId', colHeader : 'User ID' },
		{ data: 'userGrp', colHeader : 'User Group', width: '90px' },
		{ data: 'userName', colHeader : 'User Name' },
		{ 
			data: 'userId userGrp',
			render : function (data, type, row){
				return row.userId + '-' + row.userGrp;
			}
		}
	],
	options: ['filter', 'refresh'],
	columnDefs : [
		{ className: 'dt-center', targets : '_all' }
	],
	vScrollLimit : '240px',
	collapse : false
});

//on cell focus
testDT.enableRowFocus(function (rows){
	var text = document.getElementById('text');
	console.log('length: ' + rows.length);
	for (var i = 0; i < rows.length; i++){
		text.innerHTML = JSON.stringify(rows[i]); // replaces content
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