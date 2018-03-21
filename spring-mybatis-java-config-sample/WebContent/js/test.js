var testDT = new DataTableBuilder('#container', '#table-test');

function lpad(minDigits, number){
	return number.toLocaleString('en', {minimumIntegerDigits: minDigits, useGrouping: false});
}

testDT.renderTable({
	url: 'giacs311/show-giacs311',
	columns : [
		{
			data: 'glAcctCode',
			width: '288px',
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
		},
		{ 
			data: 'glAcctName',
			width: '350px'
		}
	],
	options: ['filter', 'refresh'],
	vScrollLimit : '240px',
	collapse : false
});

testDT.enableRowFocus(function(row){
	document.getElementById('text').innerHTML = JSON.stringify(row);
});