/**
 * @author daniel marasigan
 * @param container - id of the div container
 * @param table - optional, id of table to be used for this data table
 * requires jquery.js, datatables.js, datatables.input.js
 */

var DataTableBuilder = function (container, table) {
    var tableObject = table ? jQuery(table) : null;
    var containerDiv = (function() {
        if (container.charAt(0) !== '#') {
        	container = '#' + container;
        }        	
        return jQuery(container);
    })();

    var util = this;
    var $qs = document.querySelector.bind(document);
    
    // toolbar constants
    var filterBtn = '<div class="dtbl-filter-btn dtbl-filter-btn-bg dtbl-toolbar-btn">Filter</div>';
    var refreshBtn = '<div class="dtbl-reload-btn dtbl-toolbar-btn">Refresh</div>';

    var filterMenu = '<div class="dtbl-filter-menu">' +
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
                             '<button class="clear-filter" style="left: calc(100% - 190px);">Clear Filter</button>' + 
                             '<button class="submit-filter" style="left: calc(100% - 180px);">Ok</button>'+
                         '</div>' +
                     '</div>';

    this.dataTableGrid = null;
    this.selectedRow = null;
    
    this.defaultFilters = {};
    this.addedFilters = {};
    this.filtersRetrieved = {};

    this.clearedFiltersState = false;
    this.toBeFilteredState = false;
    
    this.taggedRecords = [];

    this.filterElements = {};
    
    var setFilterElements = function() {
    	util.filterElements.filterBtn = containerDiv.find('.dtbl-filter-btn');
    	util.filterElements.filterSelect = containerDiv.find('.dtbl-filter-list');
    	util.filterElements.filterKeyword = containerDiv.find('.dtbl-filter-entry');
    	util.filterElements.filterList = containerDiv.find('.dtbl-filter-text-list');
    	util.filterElements.filterAddBtn = containerDiv.find('.add-filter');
    	util.filterElements.filterClearBtn = containerDiv.find('.clear-filter');
    	util.filterElements.filterSubmitBtn = containerDiv.find('.submit-filter');
    };

    this.getTable = function (){
        return tableObject;
    };

    this.getContainer = function (){
        return containerDiv;
    };

    this.isEmptyAddedFilters = function() {
    	return Object.keys(util.addedFilters).length === 0 && util.addedFilters.constructor === Object;
    };
    
    this.isEmpty = function (element){
    	return ['', null, undefined].indexOf(element) !== -1;
    };
    
    this.constructOptionsToolbar = function (options) {
    	if (options.length === 0){
            return '';
        }
    	
    	if (!Array.isArray(options)) {
            throw new TypeError('options must be of the type array', 'DataTableBuilder.js', 21);
        }
        
        var toolbar = '<div class="dtbl-toolbar">';

        if (options.indexOf('filter') !== -1){
            toolbar = toolbar + filterBtn;
        }
        if (options.indexOf('refresh') !== -1){
            toolbar = toolbar + refreshBtn;
        }
        if (options.indexOf('filter') !== -1){
            toolbar = toolbar + filterMenu;
        }
        toolbar = toolbar + '</div>';

        return toolbar;
    };

    var constructTable = function (tableId, columns){
        var table = '<table id="' + tableId + '" class="cell-border compact hover" style="width: 100%; border-bottom: 1px solid #ddd;"><thead>'; 
        for (var idx = 0; idx < columns.length; idx++){
            table = table + '<th>' + columns[idx].colHeader + '</th>';
        }
        table += '</thead></table>';

        return table;
    };
    
    this.removeTagRecordMatch = function (rec, arr){
    	var match = false;
    	for (var idx2 = 0; idx2 < arr.length; idx2++){
    		for (var prop in arr[idx2]){
    			if (arr[idx2][prop] === rec[prop] && arr[idx2].hasOwnProperty(prop) && rec.hasOwnProperty(prop)){
    				match = true;
    			} else {
    				match = false;
    				break;
    			}
    		}
    		
    		if (match) {
    			arr.splice(idx2, 1);
    			break;
    		}
    	}
    };
    
    var getColumnsForTagging = function (columns){
    	var newCols = columns;
    	for (var idx = 0; idx < columns.length; idx++) {
    		if (['tag', 'display'].indexOf(columns[idx].tagOption) !== -1) {
    			var newColDef = columns[idx];
    			var cbx = document.createElement('input');
				cbx.type = 'checkbox';
				cbx.className = 'dt-tags';
				
    			/*if (columns[idx].tagOption === 'tag'){
    				cbx.onclick = function () {
    					var row = util.dataTableGrid.rows('.selected').data()[0];
    					columns[idx].onclick(row);
    					if (this.checked){
    						util.taggedRecords.push(row);
    					} else {
    						removeTagRecordMatch(row, util.taggedRecords);
    					}
    				};
    			} else*/ if (columns[idx].tagOption === 'display') {
    				cbx.disabled = true;
    				cbx.checked = true;
    				//cbx.setChecked = columns[idx].setChecked;
    			}
    			
    			//var cbb = new DataTableBuilder.CellCheckBox({onclick : cbx.onclick, setChecked : columns[idx].setChecked});
    			
    			newColDef.render = function (data, type, row){
    				return cbx.outerHTML; //cbb.construct(data);
    			};
    			
    			newCols[idx] = newColDef;
    		}
    	}    	
    	return newCols;
    };
    
    this.renderTable = function (parameters) {
    	if (!this.isEmpty(parameters.options)){
	        var toolbarDiv = this.constructOptionsToolbar(parameters.options);
	        containerDiv.prepend(toolbarDiv);
	        
	        if (parameters.options.indexOf('filter') !== -1) {
	        	setFilterElements();
	        }
	        
	        this.initializeEventHandlers(parameters.options, parameters.id);
    	}

        if (tableObject === null){
        	if (!parameters.id) {
        		throw new ReferenceError('ID should be defined if no table is used.', 'DataTableBuilder.js', 86);
        	}
        	var table = constructTable(parameters.id, parameters.columns);
            containerDiv.append(table);
            tableObject = jQuery('#' + parameters.id);
        }

        var paramLen = parameters.pageLength;
        var pLength = isNaN(paramLen) && parseInt(paramLen) > 0 ? 10 : paramLen;

        this.defaultFilters = parameters.data;

        this.setBeforeRender(parameters.beforeRender);
        this.setAfterRender(parameters.afterRender, !this.isEmpty(parameters.options));
        
        //var newColumns = getColumnsForTagging(parameters.columns);
        
        this.dataTableGrid = tableObject.DataTable({
            serverSide : true,
            pageLength : pLength,
            lengthChange : false,
            searching : false,
            pagingType : 'input',
            select: parameters.select ? parameters.select : 'single',
            scrollX: true,
            scrollY : parameters.vScrollLimit ? parameters.vScrollLimit : '',
            scrollCollapse: parameters.collapse ? parameters.collapse : false,
            order: [],
            ajax : {
                url : parameters.url,
                data : function (d){
                	Object.assign(d, parameters.data);
                	return d;
                },
                type : 'GET',
                dataType: 'json',
                dataSrc : function (json){
                    return JSON.parse(json.rows);
                },
                error : function (jqXHR, textStatus, errorThrown){
                	if (parameters.onError){
                		parameters.onError(errorThrown, jqXHR, textStatus);
                	} else {
                		console.log(errorThrown);
                	}
                }
            },
            columns: parameters.columns,
            columnDefs : parameters.columnDefs
        });
        
        return this.dataTableGrid;
    };

    this.enableRowFocus = function(handler){
        var dtblGrid = this.dataTableGrid;
        tableObject.on('click', 'tr', function(p){
            jQuery(this).toggleClass('selected');
            util.selectedRow = dtblGrid.rows('.selected').data()[0];
            if (handler) { 
            	handler(dtblGrid.rows('.selected').data(), p);
            }
        });

        return dtblGrid;
    };

    this.enableRowSelect = function (handler){
        tableObject.on('dblclick', 'tr', function(p){
            handler(); //add row selected as param here
        });

        return this.dataTableGrid;
    };
        
    this.addFilterToList = function (filters){
    	this.addedFilters[filters.filterBy] = filters.filterKeyword;
        containerDiv.find('.dtbl-filter-entry').val('');                    
        var filterList = '';
        for (var prop in this.addedFilters){
        	if (this.addedFilters.hasOwnProperty(prop)){
        		filterList = filterList + filters.filterSelected + '=' + this.addedFilters[prop] + ';'; 
        	}
        }
        containerDiv.find('.dtbl-filter-text-list').val(filterList);
    };
    
    this.addToListIfValidFilterValue = function (){
        var filters = {
            filterBy : containerDiv.find('.dtbl-filter-list').val(),
            filterType : containerDiv.find('.dtbl-filter-list option:selected').attr('filter-type'),
            filterKeyword : containerDiv.find('.dtbl-filter-entry').val().trim(),
            filterSelected : containerDiv.find('.dtbl-filter-list option:selected').text()
        };
    	
    	jQuery.ajax({
    		method : 'GET',
    		url : 'validate',
    		data : {
    			filterType : filters.filterType,
    			keyword : filters.filterKeyword
    		},
    		success: function (data, textStatus, jqXHR){
    			if (data === 'valid') {
    				util.addFilterToList(filters);
    			}
    		},
    		error : function (jqXHR, textStatus, errorThrown) {
    			alert(errorThrown + ' : ' + filters.filterSelected + ' ' + jqXHR.responseText);
    			$qs(containerDiv + ' .dtbl-filter-entry').val('');
    		}
    	});
    };
    
    this.reload = function (dataParameters) {
        if (this.dataTableGrid === null){
            throw new ReferenceError('Data table is not yet rendered', 'DataTableBuilder.js', 117);
        }

        Object.assign(this.dataTableGrid.context[0].ajax.data, dataParameters);
        this.dataTableGrid.draw();

        return this.dataTableGrid;
    };

    this.setBeforeRender = function(handler){
        tableObject.on('preXhr.dt', function(e, settings, data){
        	if (data.order.length > 0) {
	        	var colIndx = data.order[0]['column'];
	        	var sortColumn = data.columns[colIndx]['data'];
	        	var ascDescFlag = data.order[0]['dir'];
	        	var sortData = {
                    sortColumn : sortColumn || null,
                    ascDescFlg : ascDescFlag
                };
                Object.assign(data, sortData);
        	}
        	
            delete data.columns;
            delete data.order;
            delete data.search;
            
            if (util.isEmptyAddedFilters()){
            	Object.assign(data, util.defaultFilters);
            } 
            if (util.toBeFilteredState){
            	Object.assign(data, util.addedFilters);
            }
            
            if (handler) { 
            	handler(data, e, settings);
            }
        });
    };

    this.setAfterRender = function(handler, hasOptions){
        tableObject.on('xhr.dt', function(e, settings, json, xhr) {
        	if (hasOptions){
	        	util.filtersRetrieved = JSON.parse(json.filters);
	            if (containerDiv.find('.dtbl-filter-list option').length === 0) {
	                jQuery.each(util.filtersRetrieved, function(index, value) {
	                	var option = document.createElement('option');
	                    option.value = value.key;
	                    option.text = value.optName;
	                    option.setAttribute('filter-type', value.filterType);
	                    $qs(container + ' .dtbl-filter-list').appendChild(option);
	                });
	            }
        	}
            if (handler) { 
            	handler(json, xhr, e, settings);
            }
        });
    };

    this.initializeEventHandlers = function (options, id){    	
        if (!Array.isArray(options)){
            throw new TypeError('Options should be of array type', 'DataTableBuilder.js', 43);
        }
        if (options.indexOf('filter') !== -1){
            containerDiv.on('click', '.dtbl-filter-btn', function(event) {
                containerDiv.find('.dtbl-filter-menu').toggle();
            })
            .on('click', '.add-filter', function(event) {
                util.addToListIfValidFilterValue();
            })
            .on('click', '.submit-filter', function(event) {
                if (util.clearedFiltersState){
                    util.clearedFiltersState = false;
                    util.toBeFilteredState = false;
                    util.addedFilters = {};
                    util.reload();
                    util.filterElements.filterBtn.removeClass('dtbl-filter-btn-active').addClass('dtbl-filter-btn-bg');
                } else if (!util.isEmptyAddedFilters()){
                    util.toBeFilteredState = true;
                    util.reload(util.addedFilters);
                    util.filterElements.filterBtn.removeClass('dtbl-filter-btn-bg').addClass('dtbl-filter-btn-active');
                }
                containerDiv.find('.dtbl-filter-menu').toggle();
            })
            .on('click', '.clear-filter', function(event) {
                if (!util.isEmptyAddedFilters()){
                    containerDiv.find('.dtbl-filter-list').prop('selectedIndex', 0);
                    containerDiv.find('.dtbl-filter-text-list, .dtbl-filter-entry').val('');
                    util.addedFilters = {};
                    util.clearedFiltersState = true;
                }
            })
            .on('change', '.dtbl-filter-list', function(){
            	containerDiv.find('.dtbl-filter-entry').val('');
            })
            .on('keydown', '.dtbl-filter-entry', function(event){
            	if (event.which === 13) {
            		if ([null, undefined, ''].indexOf(this.value.trim()) === -1){
                        util.addToListIfValidFilterValue();
                        this.focus();
            		} else {
            			util.toBeFilteredState = true;
            			util.reload(util.addedFilters);
            			util.filterElements.filterBtn.removeClass('dtbl-filter-btn-bg').addClass('dtbl-filter-btn-active');
                    	containerDiv.find('.dtbl-filter-menu').toggle();
            		}
            	}
            });
        }

        if (options.indexOf('refresh') !== -1){
            containerDiv.on('click', '.dtbl-reload-btn', function(event) {
            	if (containerDiv.find('.dtbl-filter-menu').length > 0) {
            		containerDiv.find('.dtbl-filter-menu').hide();
            	}
                util.reload();
            });
        }
    };
};

/*
function renderTable : 
parameters: {
	id : ''    				// table id
	url : '',  				// request url
	data : {}, 				// request parameters
	pageLength : 10, 		// number of rows per page,
	vScrollLimit: '200px',   // height in which the vertical scroll will be adjusted
	taggable : true | false, // enables checkbox tagging for table rows, default is false
	columns : [				// column detail array of objects
		{
			data : '',		// name of property from json
			colHeader : '',    // column header / title to be used
			render : function (data, type, row){
				// data : see above data property
				// type :
				// row : the whole row of data / an object in the json data source
			}
		}, 
		{}
	],
	columnDefs : [], //
	select: 'single' | 'multiple'
	options : [filter, refresh],
	enableMultiSelection : true | false,
	beforeRender : function(data, e, settings){},
	afterRender : function(json, xhr, e, settings){}
}
*/

DataTableBuilder.CellCheckBox = function (args) {
	this.setChecked = args.setChecked;
	this.editable = args.editable;
	this.cbxLabel = args.identifier;
	
	this.construct = function (data){
		if (['', null, undefined].indexOf(this.cbxLabel) !== -1){
			throw new ReferenceError('identifier should be defined in your column definitions'); 
		}
		
		var checked = this.setChecked && this.setChecked(data) ? ' checked ' : '';
		var disabled = this.editable ? '' : ' disabled ';
		
		var cbx = '<input type="checkbox" class="dt-tags" ' + disabled + ' ' 
			+ checked + ' cbx-label="' + this.cbxLabel +'" />';
		
		return cbx;
	};
};
