<!DOCTYPE html>
<html>
	<head>
		<title>test</title>
		<!-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
		 --><link rel="stylesheet" type="text/css" href="css/datatables.min.css">
		<link rel="stylesheet" type="text/css" href="css/select.dataTables.min.css">
		<script type="text/javascript" src="js/jquery-3.2.1.min.js"></script>
		<script type="text/javascript" src="js/datatables.min.js"></script>
		<script type="text/javascript" src="js/dataTables.select.min.js"></script>
		<!-- <script type="text/javascript" src="https://cdn.datatables.net/plug-ins/1.10.16/pagination/input.js"></script> -->
		<script type="text/javascript" src="js/dataTables.pagination.input.js"></script>
		<style type="text/css">
			body {
				font-family: Segoe UI;
			}
			
			input[type="text"] {
				padding: 3px;
				box-sizing: border-box;
			}
			
			.filter-btn {
				position: relative;
				left: calc(100% - 60px);
				height: 98%;
				width: 60px;
				cursor: pointer;
				padding: 0px 10px;
				text-align: right;
				box-sizing: border-box;
				border: 1px solid transparent;
				background: url(images/funnel.png) left center no-repeat;
			}
			
			.filter-btn:hover {
				background-color: #eef;
    			border: 1px solid #ccc;
    			background: url(images/funnel_red.png) left center no-repeat;
   			}
			
			.filter-menu{
				width: 445px;
				height: 160px;
				background-color: #f0f0f0;
				display: none;
				position: relative;
				z-index: 20;
				left: calc(100% - 445px);
				margin-top: 2px;
				border: 1px solid #456179;
				border-radius: 3px;
				color: #456179;
			}
			
			.filter-menu button {
				width: 90px;
				position: relative; 
				left: calc(100% - 90px);
				border: solid 1px #2c4762;
				color: #fff;
				padding: 2px 3px 2px 4px;
				border-radius: 3px;
				background-color: #415c77;
			}
			
			.filter-menu input[type=text], .filter-menu select {
				width: 135px;
				height: 25px;
			}
			
			.show {
				display: block;
			}
			
			.dtbl-options {
				height: 25px; 
				width: 100%;
				border: solid 1px #ccc;
				background-color: #eee;
				padding: 1px 0;
				box-sizing: border-box;
			}
			
			/* The Modal (background) */
			.modal {
			    display: none; /* Hidden by default */
			    position: fixed; /* Stay in place */
			    z-index: 1; /* Sit on top */
			    padding-top: 100px; /* Location of the box */
			    left: 0;
			    top: 0;
			    width: 100%; /* Full width */
			    height: 100%; /* Full height */
			    overflow: auto; /* Enable scroll if needed */
			    background-color: rgb(0,0,0); /* Fallback color */
			    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
			}
			
			/* Modal Content */
			.modal-content {
			    background-color: #fefefe;
			    margin: auto;
			    /* padding: 20px; */
			    border: 5px solid #2c4762;
			    width: 80%;
			    border-radius: 3px;
			    
			}
			
			.modal-header {
				background-color: #e8e8e8;
				height: 25px;
			}
			
			/* The Close Button */
			.close {
			    color: #aaaaaa;
			    /* float: right; */
			    font-size: 28px;
			    font-weight: bold;
			    position: relative;
			    top: -10px;
			}
			
			.close:hover,
			.close:focus {
			    color: #000;
			    text-decoration: none;
			    cursor: pointer;
			}
		</style>
	</head>
	<body style="padding: 0 100px;">
		<input type="hidden" id="contextPath" value="${pageContext.request.contextPath}">
		<button id="click">Click me</button>
		<div style="width: 800px; height: 500px; padding: 5px; font-size: 11px;">
			<div id="options-tables" class="dtbl-options">
				<div id="filter-btn" class="filter-btn">Filter</div>
				<div id="filter-dropdown" class="filter-menu">
					<div style="height: 25px; width: inherit; margin: 10px 15px 10px 30px;">
						<label for="filter-list">Filter By: </label>
						<select id="filter-list" style="margin-right: 20px;"></select>
						<label for="filter-entry">Keyword: </label>
						<input type="text" id="filter-entry">
					</div>
					<div style="margin: 5px 10px; clear: both;"><button id="add-filter">Add Filter</button></div>
					<div style="margin: 10px 10px 5px 20px;">
						<span style="position: relative; bottom: 9px;">Filter Text: </span>
						<textarea id="filter-text-list" style="resize: none; height: 35px; width: 348px;" readonly="readonly"></textarea>
					</div>
					<div style="margin: 0 10px 5px 10px;">
						<button id="clear-filter" style="left: calc(100% - 180px);">Clear Filter</button>
						<button id="submit-filter" style="left: calc(100% - 180px);">Ok</button>
					</div>
				</div>
			</div>
			<table id="tablesample">
				<thead>
					<th>User ID</th>
					<th>User Group</th>
					<th>User Name</th>
					<th>Test</th>
				</thead>
			</table>
		</div>
		<%@ include file="/pages/modal.jsp" %>
	</body>
</html>
<script type="text/javascript">
	var table = $('#tablesample');
	var newData = {};
	

	// use this to modify the "data" / request parameters sent to the server 
	// when rendering the table with serverSide : true
	table.on('preXhr.dt', function(e, settings, data){
		/* newData.sortColumn = tb.context[0].aoColumns[data.order[0].column].data
		newData.orderExp = data.order[0].dir; */
		
		delete data.columns;
		delete data.search;
		delete data.order;
		
		//Object.assign(data, newData);
	});
	
	var tb = table.DataTable({
		serverSide : true, // let the "server" handle processing for ordering, paginating, sorting, among others...
		pageLength : 10, // set number of rows per page
		lengthChange : false, //disable selection of number of rows per page
		searching : false, //disable default searching
		pagingType : 'input',
		ajax : {
			url : $('#contextPath').val() + '/get-all',
			data : { userQuery : 'JDANIEL' },
			type : 'GET',
			dataType : 'json',
			dataSrc : function(json){
				var data = JSON.parse(json.users);
				/* $.each(JSON.parse(json.filters), function(index, value){
					$('#filter-list').append('<option value="' + value + '">' + value.replace('_', ' ') + '</option>');
				}); */
				return Array.isArray(data) ? data : [data];
			}
		},
		columns : [
			{ data : 'userId' }, //, orderable: false },
			{ data : 'userGrp' },
			{ data : 'userName' },
			{ 
				data : 'test',
				render : function (data, type, row){
					return row.userId + ' - ' + row.userGrp;
				}
			}
		],
		columnDefs : [
			{className : 'dt-center', targets : [1, 2]},
			//{orderable : false, targets: '_all'}
			{searchable : false, targets: '_all'}
		]
	});
	
	table.on('click', 'tr', function() {
		$(this).toggleClass('selected');
	}).on('xhr.dt', function(e, settings, json, xhr){
		$.each(JSON.parse(json.filters), function(index, value){
			$('#filter-list').append('<option value="' + value + '">' + value.replace('_', ' ') + '</option>');
		}); 
	});
	
	$('#click').click(function(){
		//Object.assign(tb.context[0].ajax.data, {userQuery : 'LTOLEN'});
		//tb.draw(); //re draw the table
	});	
	
	var columns = (function (){
		var cols = tb.context[0].aoColumns;
		var data = [];
		for(var i = 0; i < cols.length; i++){
			data.push({column : cols[i].data, label: cols[i].sTitle});
		}
		return data;
	})();

	$('#options-tables .filter-btn').click(function() {
		$('#options-tables .filter-menu').toggle();
	});
	
	// modal test : start
	// Get the modal
	var modal = document.getElementById('myModal');
	
	// Get the button that opens the modal
	var btn = document.getElementById("click");
	
	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];
	
	// When the user clicks the button, open the modal 
	btn.onclick = function() {
	    modal.style.display = "block";
	}
	
	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
	    modal.style.display = "none";
	}
	// modal test : end
</script>