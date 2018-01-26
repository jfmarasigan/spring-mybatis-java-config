<!DOCTYPE html>
<html>
	<head>
		<title>test</title>
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
		<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/datatables.min.css">
		<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery-3.2.1.min.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/js/datatables.min.js"></script>
	</head>
	<body>
		<input type="hidden" id="contextPath" value="${pageContext.request.contextPath}">
		<button id="click">Click me</button>
		<br/><br/><br/><br/>
		<div style="width: 800px; height: 700px; border: 1px solid #000; padding: 5px;">
			<table id="tablesample">
				<thead>
					<th>User ID</th>
					<th>User Group</th>
					<th>User Name</th>
					<th>Test</th>
				</thead>
			</table>
		</div>
	</body>
</html>
<script type="text/javascript">
	var table = $('#tablesample');
	var newData = {};
	
	// use this to modify the "data" / request parameters sent to the server 
	// when rendering the table with serverSide : true
	table.on('preXhr.dt', function(e, settings, data){
		delete data.columns;
		Object.assign(data, newData);
		/* for (var prop in newData){
			if (newData.hasOwnProperty(prop)){
				data[prop] = newData[prop];
			}
		} */
		console.log(data);
	});
	
	var tb = table.DataTable({
		serverSide : true, // let the "server" handle processing for ordering, paginating, sorting, among others...
		pageLength : 10, // set number of rows per page
		lengthChange : false, //disable selection of number of rows per page
		ajax : {
			url : $('#contextPath').val() + '/getUser',
			data : { userQuery : 'JDANIEL' },
			type : 'GET',
			dataType : 'json',
			dataSrc : function(json){
				var data = JSON.parse(json.users);
				return Array.isArray(data) ? data : [data];
			}
		},
		columns : [
			{ data : 'userId' },
			{ data : 'userGrp' },
			{ data : 'userName' },
			{ 
				data : null,
				render : function (data, type, row){
					return row.userId + ' - ' + row.userGrp;
				}
			}
		]
	});

	$('#click').click(function(){
		newData = { userQuery : 'LTOLEN' };
		tb.draw();
	});	
	
</script>