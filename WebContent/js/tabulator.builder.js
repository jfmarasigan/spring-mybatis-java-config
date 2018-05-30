/**
 * Custom builder for Tabulator© by Oli Folkerd (<link>tabulator.info</link>)
 * Requires Tabulator (created with version 3.5),
 * JQuery, and a web browser with full ECMAScript 6 support
 *
 * Created by Daniel Marasigan
 * */
class TabulatorBuilder {
	constructor(container) {
		this.container = container;
		this.tab = jQuery(container);
		this.tableGrid = null;

		this.url = '/';
		this.hasGroupColumns = false;
		this.clearSort = false;
		this.headerEvent = { forRequest : true };
		this.ajaxData = { params : null, response : null };
		this.sortData = { colTitle : "", sortCol : "", dir : "", isManualSort : false };
		this.persistence = { data : {} };

		this.initialData = {};
		this.filters = {};
	}

	nvl (value, defolt) {
		return [null, undefined, ''].indexOf(value) !== -1 ? defolt : value;
	}

	isEmpty(value) {
		return [null, undefined, ''].indexOf(value) !== -1;
	}

	isEmptyObject(obj) {
		return Object.keys(obj).length === 0 && obj.constructor === Object;
	}

	onError (message) {
		// replace this later if showMessageBox is not using prototypejs anymore
		showMessageBox(message, imgMessage.ERROR);
	}

	onReload(){
		// intentionally empty
	}

	createPagingInputBox (table, onenter) {
		const pageNoField = document.createElement('input');
		pageNoField.type = 'text';
		pageNoField.id = 'pager-num';
		pageNoField.style.width = '33px';
		pageNoField.onkeydown = function (event) {
			if (event.keyCode === 13 && this.value.trim() !== ''){
				onenter(table, this.value);
			}
		};

		return pageNoField;
	}

	createPagingInfoBox () {
		this.tab.find('#pager-info').remove();
		const pageInfoBox = document.createElement('div');
		pageInfoBox.id = 'pager-info';
		pageInfoBox.style.float = 'left';
		pageInfoBox.style.clear = 'both';
		pageInfoBox.style.paddingTop = '0.30em';

		return pageInfoBox;
	}

	setPagingInfo (count) {
		const start = this.ajaxData.params.start;
		const end = this.ajaxData.params.start - 1 + count;
		const totalCount = this.ajaxData.response.count;

		if (this.nvl(start, '') === '') {
			console.warn('start does not exist');
		}
		if (this.nvl(end, '') === ''){
			console.warn('end does not exist');
		}
		if (this.nvl(totalCount, '') === ''){
			console.warn('Total count does not exist. Check the response if there is a count reponse parameter.');
		}

		let infoMsg = 'Showing ' + start + ' to ' + end + ' of ' + totalCount + ' records';
		if (count === 0) {
			infoMsg = 'No records found';
		}
		this.tab.find('#pager-info').html(infoMsg);
	}

	setNewAjaxParameters(params) {
		this.initialData = params;
		return this;
	}

	renderTable(settings) {
		const util = this;

		this.url = settings.url;
		this.initialData = settings.data;

		const id = this.tab.prop('id') + '-content';
		this.tab.append('<div id="' + id +'" style="height : calc(100% - 25px);"></div>');

		this.tableGrid = jQuery('#' + id);
		const tables = this.tableGrid;

		let tbheight = "100%";
		if (settings.options !== undefined && settings.options.length > 0) {
			this.tab.prepend(util.createToolbar(settings.options));
			this.attachEventToToolbar(settings.options);
			tbheight = "calc(100% - 25px)";
		}

		this.checkForGroupColumns(settings.columns);

		if (util.hasGroupColumns === true) {
			this.addSortForColumns(settings.columns);
		}

		this.onReload = settings.onReload || this.onReload;

		tables.tabulator({
			keybindings : true,
			tooltipsHeader : true,
			placeholder : "No Records Found",
			layout : "fitColumns",
			height : tbheight,
			columns : settings.columns,
			selectable : 1,
			selectablePersistence : false,
			ajaxConfig : 'GET',
			ajaxURL : util.url,
			ajaxParams : util.initialData,
			ajaxRequesting : function(url, params) {
				if (util.headerEvent.forRequest === true || util.hasGroupColumns === false) {
					params.start = ((params.page - 1) * params.size) + 1;
					params.end = params.page * params.size;
					if (util.clearSort !== true) {
						if (params.sorters.length > 0 && util.sortData.isManualSort === false) {
							params.sortColumn = params.sorters[0]['field'];
							const dir = util.getSortDir(params.sortColumn);
							params.ascDescFlg = dir;
						}
						if (util.sortData.isManualSort === true) {
							params.sortColumn = util.sortData.sortCol;
							params.ascDescFlg = util.sortData.dir;
						}
					} else {
						util.clearSort = false;
					}
					delete params.sorters;
					util.ajaxData.params = params;
					util.headerEvent.forRequest = false;
					return util.ajaxData.params;
				} else {
					return false;
				}
			},
			ajaxResponse : function(url, params, response) {
				util.ajaxData.response = response;
				if (typeof settings.responseCallback === 'function'){
					return settings.responseCallback(url, params, response);
				} else {
					return response;
				}
			},
			ajaxFiltering : true,
			ajaxSorting : true,
			pagination : 'remote',
			paginationSize : settings.pageSize || 10,
			rowClick : function (e, row) {
				const data = row.getData();
				if (typeof settings.rowClick === 'function'){
					settings.rowClick(data, e);
				}
			},
			rowSelected:function(row){
				const data = row.getData();
				if (typeof settings.rowSelect === 'function'){
					settings.rowSelect(data, row);
				}
		    },
		    rowDeselected:function(row){
		    	const data = row.getData();
		    	if (typeof settings.rowDeselect === 'function'){
					settings.rowDeselect(data, row);
				}
		    },
			rowDblClick : function (e, row){
				const data = row.getData();
				if (typeof settings.rowDblClick === 'function') {
					settings.rowDblClick(data, e);
				}
			},
			tableBuilt : function() {
				util.addEventToPager();
				const pagingInfo = util.createPagingInfoBox();
				const pagingInput = util.createPagingInputBox(tables, function (tab, value){
					tab.tabulator('setPage', parseInt(value));
				});
				tables.find('.tabulator-footer').prepend(pagingInfo);
				tables.find('.tabulator-pages').remove();
				jQuery(pagingInput).insertAfter(tables.find('.tabulator-page[data-page="prev"]'));

				const colGroups = jQuery('.tabulator-col.tabulator-col-group');
				colGroups.find('>:first-child').append('<div class="tabulator-arrow"></div>');
				colGroups.addClass('tabulator-sortable');
			},
			pageLoaded : function(pageNo){
				tables.find('#pager-num').val(pageNo);
				util.addFilterMenu();
			},
			dataLoaded : function (data) {
				util.setPagingInfo(data.length);
				if (typeof settings.dataLoaded === 'function') {
					settings.dataLoaded(data);
				}
			},
			dataSorted : function () {
				util.tableGrid.tabulator("redraw");
			},
			renderComplete : function(){
				util.tableGrid.tabulator("redraw");
				if (util.hasGroupColumns === true) {
					jQuery(".tabulator-col.tabulator-sortable")
					.not('[title="'+ util.sortData.colTitle +'"]')
					.attr("aria-sort", "none");

					if (util.sortData.isManualSort === false) {
						jQuery(".tabulator-col.tabulator-sortable[title='" + util.sortData.colTitle +"']")
						.attr("aria-sort", util.sortData.dir);
					}
				}
		    }
		});

		if (typeof settings.onError === 'function') {
			this.onError = settings.onError;
		}
	}

	checkForGroupColumns(columns) {
		const builder = this;
		for (const col of columns) {
			if (col.columns !== undefined && col.columns.length > 0){
				builder.hasGroupColumns = true;
				break;
			}
		}
	}

	addEventToPager () {
		const builder = this;
		this.tab.find('.tabulator-page').mousedown(function() {
			builder.headerEvent.forRequest = true;
		});
	}

	// not used but kept in case if css doesn't work
	resizeHeaders () {
		// hide child column headers
		jQuery('.tabulator-col-group-cols, .tabulator-col-group-cols > div')
			.css({"visibility" : "hidden", "height" : "1px"});
		// resize header after hiding child column headers
		jQuery('.tabulator-col.tabulator-sortable').css({"height" : "23.2px"});
	}

	// remove css from calendar
	removeArrows () {
		const resizehandle = jQuery('.tabulator-col-resize-handle.prev');
		resizehandle.css({'background' : 'none', 'height' : '0px'});
	}

	addFilterMenu () {
		const filters = this.ajaxData.response.filters;
		if (filters) {
			if (this.tab.find('.dtbl-filter-list option').length > 0) {
				return false;
			}
			for (const filter of filters){
				const option = '<option value="' + filter.key+'" filter-type="' + filter.filterType + '">'
					+ filter.optName + '</option>';
				this.tab.find('.dtbl-filter-list').append(option);
			}
		}
	}

	// for non column groups sort direction
	getSortDir(field) {
		const header = $j(".tabulator-col.tabulator-sortable[tabulator-field='" + field + "']");
		const sort = header.attr("aria-sort");
		if (['none', 'asc', 'desc'].indexOf(sort) !== -1) {
			if (sort === 'asc') {
				return "desc";
			} else {
				return "asc";
			}
		}
	}

	addSortForColumns(columns) {
		const builder = this;

		function sortCol(sort, field, header) {
			builder.sortData.dir = sort;
			builder.sortData.isManualSort = true;
			builder.reload();
			header.attr('aria-sort', sort);
		}

		function headerEv (data) {
			builder.headerEvent.forRequest = true;
			if (data.title !== builder.sortData.colTitle) {
				builder.sortData = { colTitle : "", sortCol : "", dir : "", isManualSort : false };
			}
			const header = jQuery('.tabulator-col.tabulator-sortable[title="'+ data.title +'"]');
			const sort = header.attr('aria-sort');
			builder.sortData.colTitle = data.title;
			builder.sortData.sortCol = data.field;
			if (data.columns !== undefined && data.columns.length > 0) {
				if (['none', 'asc', 'desc'].indexOf(sort) !== -1) {
					if (sort === 'asc') {
						sortCol("desc", data.field, header);
					} else {
						sortCol("asc", data.field, header);
					}
				}
			} else {
				builder.sortData.dir = builder.getSortDir(data.field);
				builder.reload();
			}
		}

		for (const data of columns){
			data.headerClick = headerEv.bind(null, data);
		}
	}

	/**
	 * retrieve all rows in the current page
	 * */
	getCurrentRowsData() {
		const rows = {
			length : 0,
			rows : []
		};
		const currentRows = this.tableGrid.tabulator('getRows');
		rows.length = currentRows.length;
		for (const data of currentRows) {
			rows.rows.push(data.row.data);
		}
		return rows;
	}

	getLoadedRows() {
		return this.tableGrid.tabulator("getRows");
	}

	/**
	 * retrieve all rows selected
	 * */
	getSelectedRow() {
		const selected = this.tableGrid.tabulator('getSelectedRows');
		let rowData = [];
		for (const data of selected) {
			rowData.push(data.row.data);
		}
		if (rowData.length === 1) {
			rowData = rowData[0];
		}
		return rowData;
	}

	deselectRow(rowIndex){
		const row = this.isEmpty(rowIndex) ? null : rowIndex;
		if (row !== null) {
			this.tableGrid.tabulator('deselectRow', row);
		} else {
			this.tableGrid.tabulator('deselectRow');
		}
	}

	/**
	 * reloads / refreshes the current table with or without additional data
	 * */
	reload (addtlData, clearSort, persistence) {
		const builder = this;
		const data = {};
		const initData = builder.initialData;
		const filters = builder.getFilters();
		const added = addtlData || {};

		if (persistence !== undefined) {
			if (persistence.clearPrevious === true) {
				builder.persistence.data = addtlData;
			} else {
				Object.assign(builder.persistence.data, addtlData);
			}
		}

		Object.assign(data, builder.persistence.data);
		Object.assign(data, initData);
		Object.assign(data, filters);
		Object.assign(data, added);
		if (clearSort === true) {
			builder.sortData = { colTitle : "", sortCol : "", dir : "", isManualSort : false };
			builder.clearSort = true;
		}
		builder.headerEvent.forRequest = true;
		builder.tableGrid.tabulator('setData', this.url, data);
		builder.onReload();
	}

	createToolbar (options) {
		const filterBtn = '<div class="dtbl-filter-btn dtbl-filter-btn-bg dtbl-toolbar-btn"><span>Filter</span></div>';
		const refreshBtn = '<div class="dtbl-reload-btn dtbl-toolbar-btn"><span>Refresh</span></div>';

		const filterMenu = '<div class="dtbl-filter-menu">' +
					        '<div style="height: 25px; width: inherit; margin: 10px 15px 10px 30px;">' +
					            '<label for="dtbl-filter-list">Filter By: </label>' +
					            '<select class="dtbl-filter-list" style="margin-right: 20px;"></select>' +
					            '<label for="dtbl-filter-entry">Keyword: </label>' +
					            '<input type="text" class="dtbl-filter-entry" autocomplete="off">' +
					        '</div>' +
					        '<div style="margin: 5px 10px; clear: both;"><button class="add-filter">Add Filter</button></div>'+
					        '<div style="margin: 10px 10px 5px 20px;">' +
					            '<span style="position: relative; bottom: 12px;">Filter Text: </span>' +
					            '<textarea class="dtbl-filter-text-list" autocomplete="off" readonly></textarea>' +
					        '</div>' +
					        '<div style="margin: 0 10px 5px 10px;">' +
					            '<button class="clear-filter" style="left: calc(100% - 190px);" disabled>Clear Filter</button>' +
					            '<button class="submit-filter" style="left: calc(100% - 180px);" >Ok</button>'+
					        '</div>' +
					    '</div>';

		let toolbar = '<div class="dtbl-toolbar">';

        if (options.indexOf('filter') !== -1){
            toolbar = toolbar + filterBtn;
            toolbar = toolbar + filterMenu;
        }
        if (options.indexOf('refresh') !== -1){
            toolbar = toolbar + refreshBtn;
        }
        toolbar = toolbar + '</div>';

        return toolbar;
	}

	getFilters () {
		const filterParams = {};
		const _filters = this.filters;
		for (const prop in _filters) {
			if (_filters.hasOwnProperty(prop)){
				filterParams[prop] = _filters[prop].keyword;
			}
		}
		return filterParams;
	}

	attachEventToToolbar (options) {
		if (options === undefined || options.length < 1) {
			return false;
		}
		const table = this.tab;
		const builder = this;

		if (options.indexOf('filter') !== -1) {
			table.find('.dtbl-filter-btn').click(function() {
				table.find('.dtbl-filter-menu').toggle();
			});

			table.find('.add-filter').click(function() {
				builder.addFilter();
			});

			table.find('.dtbl-filter-entry').keydown(function (event) {
				if (event.keyCode === 13){
					if (this.value.trim() !== "") {
						builder.addFilter();
					} else {
						if (!builder.isEmptyObject(builder.filters)){
							builder.submitFilter();
						}
					}
				}
			});

			table.find('.clear-filter').click(function() {
				builder.clearFilter(this);
			});

			table.find('.submit-filter').click(function() {
				builder.submitFilter();
			});
		}

		if (options.indexOf('refresh') !== -1) {
			table.find('.dtbl-reload-btn').click(function () {
				builder.reload({}, true);
			});
		}
	}

	addToFilters (filter) {
		this.filters[filter.selected] = filter;
		const table = this.tab;
		let text = '';
		for (const prop in this.filters) {
			if (this.filters.hasOwnProperty(prop)){
				text = text + this.filters[prop].dspText + '=' + this.filters[prop].keyword + ';';
			}
		}

		table.find('.dtbl-filter-entry').val('');
		table.find('.dtbl-filter-text-list').val(text);
		table.find('.clear-filter').prop('disabled', false);
	}

	validateAddedFilter (filter) {
		const builder = this;
		try {
			jQuery.ajax({
				method : 'GET',
				url : 'util/validate-field',
				data : {
					filter : filter.dspText,
					filterType : filter.type,
					keyword : filter.keyword
				},
				success : function (data) {
					if (data === 'valid') {
						builder.addToFilters(filter);
					}
				},
				error : function (jqXHR){
					builder.onError(jqXHR.responseText);
				}
			});
		} catch (e) {
			throw new Error(e);
		}
	}

	addFilter () {
		const table = this.tab;
		const filter = {
			selected : table.find('.dtbl-filter-list').val(),
			type : table.find('.dtbl-filter-list option:selected').attr('filter-type'),
			keyword : table.find('.dtbl-filter-entry').val().trim(),
			dspText : table.find('.dtbl-filter-list option:selected').text()
		};

		if (filter.keyword === '') {
			return false;
		}

		this.validateAddedFilter(filter);
	}

	submitFilter () {
		const table = this.tab;

		if (!this.isEmptyObject(this.filters)){
			table.find(".dtbl-filter-btn").removeClass('dtbl-filter-btn-bg').addClass('dtbl-filter-btn-active');
			this.reload();
		} else {
			table.find(".dtbl-filter-btn").removeClass('dtbl-filter-btn-active').addClass('dtbl-filter-btn-bg');
			if (this.clearedFilters === true) {
				this.reload();
				this.clearedFilters = false;
			}
		}

		table.find('.dtbl-filter-menu').toggle();
	}

	clearFilter (thisBtn) {
		this.filters = {};
		this.tab.find('.dtbl-filter-text-list').val('');
		thisBtn.disabled = true;
		this.clearedFilters = true;
	}
}


class HTMLFactory {
	constructor() {
		this.elements = {
			'checkbox' : 'CellCheckBox'
		};
	}

	static cellCheckBox (cell, params) {
		const row = cell.getRow();
		const rowData = row.getData();
		const newCbx = document.createElement('input');
		newCbx.id = params.id || '';
		newCbx.type = 'checkbox';
		newCbx.classList = params.classes || '';
		newCbx.disabled = params.disabled || false;
		if (typeof params.tagged === "function") {
			newCbx.checked = params.tagged(rowData);
		}
		newCbx.onclick = function (event) {
			params.onclick(rowData, event);
		};

		return newCbx;
	}

	static cellRadioButton (cell, params) {
		const row = cell.getRow();
		const rowData = row.getData();
		const newRdb = document.createElement('input');
		newRdb.type = 'radio';
		newRdb.name = params.name + row.getPosition();
		newRdb.disabled = params.disabled || false;
		newRdb.checked = params.tagged(rowData);
		newRdb.onclick = function (event) {
			// use row.update({'object name' : 'value'}) to update values
			params.onclick(rowData, row, event);
		};

		return newRdb;
	}
	// add other html input elements here
}
