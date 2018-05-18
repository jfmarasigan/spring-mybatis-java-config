var builder = new TabulatorBuilder('#sample-table');

function numLpad(number, minDigits) {
	return number.toLocaleString('en', {
		minimumIntegerDigits : minDigits,
		useGrouping : false
	});
}

//sample for tagging records manually (not using tagged / onclick functions of HTMLFactory.cellCheckBox)
//sample will be using builder.getLoadedRows()
function sampleTagging(rows){
	for (const row of rows) {
		const rowElem = row.getCell("tag").getElement();
		const rowData = row.getData();
		if (rowData.glSubAcct1 === "1") {
			rowElem.find(".cbx-tag").attr("checked", true);
		}
	}
	return true;
}

var settings = {
	url : 'giacs311/tb-giacs311',
	columns : [ {
		title: 'cbx',
		field : 'tag',
		align : 'center',
		width : 30,
		minWidth : 20,
		formatter : function (cell, formatterParams) {
			return HTMLFactory.cellCheckBox(cell, {
				classes : "cbx-tag",
				/*tagged : function (data) {
					return data.glSubAcct1 === "1";
				},*/
				onclick : function (data, cell) {
					console.log(cell.getColumn());
				}
			});
		}
	},
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
				let row = cell.getRow();
				/*console.log(row);
				console.log(row.getPosition());*/
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
		} ]/*,
		headerClick : function() {
			console.log(this.title + ' ' + this.field);
			$('.tabulator-col.tabulator-col-group')
		}*/
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
