var builder = new TabulatorBuilder('#sample-table');

function numLpad(number, minDigits) {
	return number.toLocaleString('en', {
		minimumIntegerDigits : minDigits,
		useGrouping : false
	});
}

var settings = {
	url : 'giacs311/tb-giacs311',
	columns : [ {
		title : 'GL Account Code',
		field : 'glAcctCode',
		width : 310,
		columns : [ {
			field : 'glAcctCategory',
			align : 'right',
			width : 31,
			minWidth : 20,
			headerSort : false
		}, {
			field : 'glControlAcct',
			align : 'right',
			width : 31,
			minWidth : 20,
			headerSort : false,
			formatter : function(cell, formatterParams) {
				return numLpad(parseInt(cell.getValue()), 2);
			}
		}, {
			field : 'glSubAcct1',
			align : 'right',
			width : 31,
			minWidth : 20,
			headerSort : false,
			formatter : function(cell, formatterParams) {
				return numLpad(parseInt(cell.getValue()), 2);
			}
		}, {
			field : 'glSubAcct2',
			align : 'right',
			width : 31,
			minWidth : 20,
			headerSort : false,
			formatter : function(cell, formatterParams) {
				return numLpad(parseInt(cell.getValue()), 2);
			}
		}, {
			field : 'glSubAcct3',
			align : 'right',
			width : 31,
			minWidth : 20,
			headerSort : false,
			formatter : function(cell, formatterParams) {
				return numLpad(parseInt(cell.getValue()), 2);
			}
		}, {
			field : 'glSubAcct4',
			align : 'right',
			width : 31,
			minWidth : 20,
			headerSort : false,
			formatter : function(cell, formatterParams) {
				return numLpad(parseInt(cell.getValue()), 2);
			}
		}, {
			field : 'glSubAcct5',
			align : 'right',
			width : 31,
			minWidth : 20,
			headerSort : false,
			formatter : function(cell, formatterParams) {
				return numLpad(parseInt(cell.getValue()), 2);
			}
		}, {
			field : 'glSubAcct6',
			align : 'right',
			width : 31,
			minWidth : 20,
			headerSort : false,
			formatter : function(cell, formatterParams) {
				return numLpad(parseInt(cell.getValue()), 2);
			}
		}, {
			field : 'glSubAcct7',
			align : 'right',
			width : 31,
			minWidth : 20,
			headerSort : false,
			formatter : function(cell, formatterParams) {
				return numLpad(parseInt(cell.getValue()), 2);
			}
		} ],
		headerClick : function() {
			console.log(this.title + ' ' + this.field);
			$('.tabulator-col.tabulator-col-group')
		}
	}, {
		title : 'GL Account Name',
		field : 'glAcctName',
		width : 400
	} ],
	options : [ 'filter', 'refresh' ],
	rowClick : function(row) {
		//console.log(row);
	},
	responseCallback : function(url, params, response) {
		/*console.log('response callback');
		console.log(url);
		console.log(params);
		console.log(response);*/

		return response;
	},
	dataLoaded : function(data) {
		/*console.log('data loaded')
		console.log(data);*/
	}
};

builder.renderTable(settings);

$('#trigger').click(function() {
	builder.reload({
		wow : 1
	});
});
