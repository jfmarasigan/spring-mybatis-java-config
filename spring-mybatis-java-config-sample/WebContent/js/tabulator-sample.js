var tab = $('#sample-table');

var paramz = {
	layout : "fitColumns",
	columns : [ {
		title : 'User ID',
		field : 'userId'
	}, {
		title : 'User Group',
		field : 'userGrp'
	}, {
		title : 'User Name',
		field : 'userName'
	}, {
		title : 'T',
		field : 'userId'
	} ],
	ajaxConfig : 'GET',
	ajaxURL : 'get-users',
	ajaxResponse : function(url, params, response) {
		response.data = JSON.parse(response.data);
		return response;
	},
	ajaxRequesting : function(url, params) {
		params.start = ((params.page - 1) * params.size) + 1;
		params.end = params.page * params.size;
		delete params.size;
		return params;
	},
	ajaxFiltering : true,
	ajaxSorting : true,
	pagination : 'remote',
	paginationSize : 10,
	tableBuilt : function() {
		$('.tabulator-pages').remove();
		var ipt = document.createElement('input');
		ipt.type = 'text';
		ipt.style.width = '30px';
		ipt.onkeydown = function (e){
			if (e.keyCode === 13) {
				// call setpage for tabulator
			}
		};
		$(ipt).insertAfter('.tabulator-page[data-page="prev"]');
		//console.log(this); this tabulator
	}
};

tab.tabulator(paramz); // triggers ajax request

/*
 * console.log('1'); var filtez = tab.tabulator('getFilters'); console.log('2');
 * tab.tabulator('setFilter', 'userId', '=', 'cpi'); // triggers ajax request
 * console.log('3'); tab.tabulator('setData'); // triggers ajax request; might
 * be used for reload
 */
