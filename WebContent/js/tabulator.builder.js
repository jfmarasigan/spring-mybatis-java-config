/**
 * Custom builder for Tabulator by Oli Folkerd (tabulator.info)
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
		this.clearSort = false;
		this.ajaxData = {
			params : null,
			response : null
		};

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

	onError (e) {
		throw new Error(e);
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

		const infoMsg = 'Showing ' + start + ' to ' + end + ' of ' + totalCount + ' records';
		this.tab.find('#pager-info').html(infoMsg);
	}

	setNewAjaxParameters(params) {
		return params;
	}

	renderTable(settings) {
		const util = this;

		this.url = settings.url;
		this.initialData = settings.data;

		const id = this.tab.prop('id') + '-content';
		this.tab.append('<div id="' + id +'" style="height : calc(100% - 25px);"></div>');

		this.tableGrid = jQuery('#' + id);
		const tables = this.tableGrid;

		this.tab.prepend(util.createToolbar(settings.options));
		this.attachEventToToolbar(settings.options);

		this.addSortForColumnGroups(settings.columns);

		tables.tabulator({
			layout : "fitColumns",
			height : 'calc(100% - 25px)',
			columns : settings.columns,
			selectable : 1,
			ajaxConfig : 'GET',
			ajaxURL : util.url,
			ajaxParams : util.initialData,
			ajaxRequesting : function(url, params) {
				params.start = ((params.page - 1) * params.size) + 1;
				params.end = params.page * params.size;
				if (params.sorters.length > 0) {
					if (!util.clearSort) {
						params.sortColumn = params.sorters[0]['field'];
						params.ascDescFlg = params.sorters[0]['dir'];
					}
					delete params.sorters;
				}
				util.ajaxData.params = params;
				return params;
			},
			ajaxResponse : function(url, params, response) {
				util.ajaxData.response = response;
				if (settings.responseCallback){
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
				settings.rowClick(row, e);
			},
			rowDblClick : function (e, row){
				settings.rowDblClick(row, e);
			},
			tableBuilt : function() {
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
				if (settings.dataLoaded) {
					settings.dataLoaded(data);
				}
			}
		});

		if (settings.onError) {
			this.onError = settings.onError;
		}
	}

	addFilterMenu () {
		const filters = this.ajaxData.response.filters;
		if (this.tab.find('.dtbl-filter-list option').length > 0) {
			return false;
		}
		for (const filter of filters){
			const option = '<option value="' + filter.key+'" filter-type="' + filter.filterType + '">'
				+ filter.optName + '</option>';
			this.tab.find('.dtbl-filter-list').append(option);
		}
	}

	addSortForColumnGroups(columns) {
		const builder = this;

		for (const data of columns){
			if (data.columns !== undefined && data.columns.length > 0) {
				data.headerClick = function () {
					const header = jQuery('.tabulator-col.tabulator-col-group[aria-title="'+ this.title +'"]');
					const sort = header.attr('aria-sort');
					if (['none', 'asc', 'desc'].indexOf(sort) !== -1) {
						if (sort === 'asc') {
							header.attr('aria-sort','desc');
							builder.reload({sortColumn : this.field, ascDescFlg : 'desc'});
						} else {
							header.attr('aria-sort','asc');
							builder.reload({sortColumn : this.field, ascDescFlg : 'asc'});
						}
					}
				};
			}
		}
	}

	resetSortForColumnGroups(){
		jQuery('.tabulator-col.tabulator-col-group').attr('aria-sort', 'none');
	}

	/**
	 * retrieve all rows in the current page
	 * */
	getCurrentRows() {
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

	/**
	 * retrieve all rows selected
	 * */
	getSelectedRow() {
		const selected = this.tableGrid.tabulator('getSelectedRows');
		const rowData = [];
		for (const data of selected) {
			rowData.push(data.row.data);
		}
		return rowData;
	}

	/**
	 * reloads / refreshes the current table with or without additional data
	 * */
	reload (addtlData, clearSort) {
		const data = {};
		const initData = this.initialData;
		const filters = this.getFilters();
		const added = addtlData || {};
		Object.assign(data, initData);
		Object.assign(data, filters);
		Object.assign(data, added);
		this.clearSort = clearSort || false;
		if (clearSort === true) {
			this.resetSortForColumnGroups();
		}
		this.tableGrid.tabulator('setData', this.url, data);
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
				if (event.keyCode === 13 && this.value.trim() !== ''){
					builder.addFilter();
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

		jQuery.ajax({
			method : 'GET',
			url : 'validate-field',
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
				builder.onError(jqXHR);
			}
		});
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
		if (!this.isEmptyObject(this.filters)){
			this.reload();
		}
		const table = this.tab;
		table.find('.dtbl-filter-menu').toggle();
	}

	clearFilter (thisBtn) {
		this.filters = {};
		this.tab.find('.dtbl-filter-text-list').val('');
		thisBtn.disabled = true;
	}
}


class TableHTMLFactory {
	constructor() {
		this.elements = {
			'checkbox' : 'CellCheckBox'
		};
	}

	static cellCheckBox (cell, params) {
		const rowData = cell.cell.row.data;
		const newCbx = document.createElement('input');
		newCbx.id = params.id || '';
		newCbx.type = 'checkbox';
		newCbx.classList = params.classes || '';
		newCbx.checked = params.tagged(rowData);
		newCbx.onclick = function (event) {
			params.onclick(data, event);
		};

		return newCbx;
	}

	// add other html input elements here
}
