<!DOCTYPE html>
<html>
	<head>
		<title>test</title>
		<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/datatables.min.css">
		<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery-3.2.1.min.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/js/datatables.min.js"></script>
	</head>
	<body>
		<input type="hidden" id="contextPath" value="${pageContext.request.contextPath}">
		<button id="click">Click me</button>
		<br/><br/><br/><br/>
		<div style="width: 750px;">
			<table id="tablesample">
				<thead>
					<th>User ID</th>
					<th>User Group</th>
					<th>User Name</th>
				</thead>
			</table>
		</div>
	</body>
</html>
<script type="text/javascript">
	$('#tablesample').DataTable({
		ajax : {
			url : $('#contextPath').val() + '/getUser',
			data : {
				wow : 1
			},
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
			{ 
				data : null,
				render : function (data, type, row){
					return row.userId + ' - ' + row.userGrp;
				}
			}
		]
	});

	$('#click').click(function(){
		/* var wee = [];

	 	$.ajax({
			method: 'GET',
			async: false,
			url : $('#contextPath').val() + '/getUser'
		}).done(function(data, textStatus){
			wee.push(JSON.parse(data));
			wat = JSON.parse(data);
			
			$('#tablesample').DataTable({
		 		data : wee,
		 		columns : [
		 			{ data : 'userId' },
		 			{ data : 'userGrp' },
		 			{ data : 'userName' }
		 		]
		 	});
		}); */
	});	
	
</script>