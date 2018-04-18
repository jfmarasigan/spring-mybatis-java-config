var testDT = new DataTableBuilder('#container', '#table-test');

function lpad(minDigits, number){
	return number.toLocaleString('en', {minimumIntegerDigits: minDigits, useGrouping: false});
}

testDT.renderTable({
	url: 'giacs311/show-giacs311',
	columns : [
		/*{
			data: 'glAcctCode',
			render: function (data, type, row){
				return row.glAcctCategory + ' - ' + lpad(2, parseInt(row.glControlAcct)) +
						' - ' + lpad(2, parseInt(row.glSubAcct1)) + 
						' - ' + lpad(2, parseInt(row.glSubAcct2)) + 
						' - ' + lpad(2, parseInt(row.glSubAcct3)) + 
						' - ' + lpad(2, parseInt(row.glSubAcct4)) + 
						' - ' + lpad(2, parseInt(row.glSubAcct5)) + 
						' - ' + lpad(2, parseInt(row.glSubAcct6)) +
						' - ' + lpad(2, parseInt(row.glSubAcct7))
						;
			}
		},*/
		{ data: 'glAcctCategory' },
		{ data: 'glControlAcct' },
		{ data: 'glSubAcct1' },
		{ data: 'glSubAcct2' },
		{ data: 'glSubAcct3' },
		{ data: 'glSubAcct4' },
		{ data: 'glSubAcct5' },
		{ data: 'glSubAcct6' },
		{ data: 'glSubAcct7' },
		{ data: 'glAcctName', width: '340px' }
	],
	options: ['filter', 'refresh'],
	vScrollLimit : '240px',
	collapse : false,
	columnDefs : [
		{ className: 'dt-body-right', targets: [0,1,2,3,4,5,6,7,8] },
		{ width: '40px', targets: [0,1,2,3,4,5,6,7,8] }		
	]
});

testDT.enableRowFocus(function(row){
	document.getElementById('text').innerHTML = JSON.stringify(row);
});