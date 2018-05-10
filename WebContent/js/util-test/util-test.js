//jQuery(document).ready(function (){ 
// use .ready if you want your .js file placed above the whole html document, 
// just be sure that DataTableBuilder.js and the whole html document is loaded before doing anything
var $qs = document.querySelector.bind(document);

var testDT = new DataTableBuilder('#container', '#table-test');

testDT.renderTable({
	id: 'table-test',
	url: 'get-all',
	columns: [
		{
			data: 'userId',
			colHeader : '&nbsp;&nbsp;&nbsp;&nbsp;T',
			width: '13px',
			orderable: false,
			identifier: 'tag-abcd',
			onTag : function (row, checked){
				console.log(checked);
				console.log(row);
			},
			render : function (data, type, row){
				var checked = data === 'LTOLEN' ? 'checked' : '';
				return '<input type="checkbox" class="dt-tags" cbx-label="tag-abcd" ' + checked + ' />';		
			}
		/*  editor: 'checkbox',
			identifier: 'tag-abcd',
			editable: true,
			setChecked : function (d) {
				return d === 'LTOLEN';
			},
			onTag : function (row){
				console.log(row);
			},
			render : function (data, type, row){
				var checked = data === 'LTOLEN' ? 'checked' : '';
				
				return '<input type="checkbox" class="dt-tags"' 
						+ checked + ' cbx-label="tag-abcd" />';
				var cbx = new DataTableBuilder.CellCheckBox({
					identifier: 'tag-abcd', 
					editable: true, 
					setChecked : function (d) {
						return d === 'LTOLEN';
					}
				});
				
				return cbx.construct(data);				
			}*/
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
	collapse : false,
	onError : function (errorThrown, jqXHR, textStatus){
		var res = jqXHR;
		console.log(jqXHR)
		alert(res.responseText);
	}
});

//on cell focus
testDT.enableRowFocus(function (row){
	console.log(row);
});

//on dbl click
testDT.enableRowSelect(function (data){
	console.log('dbl click triggered');
});

document.getElementById('btn-click').onclick = function() {
	testDT.reload({
		userId: '%a%'
	});
}
//});