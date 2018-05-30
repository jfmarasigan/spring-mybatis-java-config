function numLpad(number, minDigits) {
	return number.toLocaleString('en', {
		minimumIntegerDigits : minDigits,
		useGrouping : false
	});
}

var settings = {
	ajaxURL : 'giacs311/tb-giacs311',
	columns : [
		{
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
			} ]
		},
		{
			title : 'GL Account Name',
			field : 'glAcctName',
			width : 400
		}
	],
	keybindings : true,
	tooltipsHeader : true,
	selectable : 1,
	selectablePersistence : false,
	ajaxConfig : 'GET',
	ajaxFiltering : true,
	ajaxSorting : true,
	pagination : 'remote',
	paginationSize : 10,
	autoResize : true,
	ajaxRequesting : function (url, params, response) {
		params.start = ((params.page - 1) * params.size) + 1;
		params.end = params.page * params.size;
		if (params.sorters.length > 0) {
			params.sortColumn = params.sorters[0]['field'];
			params.ascDescFlg = params.sorters[0]['dir'];
		}
		return params;
	}
};

$("#sample-table").tabulator(settings);