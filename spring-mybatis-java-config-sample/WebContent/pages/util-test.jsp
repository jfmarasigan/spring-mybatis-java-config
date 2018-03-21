<!DOCTYPE html>
<html>
	<head>
		<title>Test Page for DataTableBuilder</title>
		<link rel="stylesheet" type="text/css" href="css/datatables.min.css">
		<link rel="stylesheet" type="text/css" href="css/select.dataTables.min.css">
		<link rel="stylesheet" type="text/css" href="css/modal.css">
		<link rel="stylesheet" type="text/css" href="css/datatables.custom.css">
		
		<!-- <script type="text/javascript" src="js/jquery.min.js"></script> -->
		<script type="text/javascript" src="js/datatables.min.js"></script>
		<script type="text/javascript" src="js/dataTables.select.min.js"></script>
		<script type="text/javascript" src="js/dataTables.pagination.input.js"></script>
		<script type="text/javascript" src="js/DataTableBuilder.js"></script>
		<style type="text/css">
			body {
				font-family: Segoe UI;
				padding: 0 100px;
			}
		</style>
	</head>
	<body>
		<input type="hidden" id="contextPath" value="${pageContext.request.contextPath}">
		<button type="button" id="btn-click">Reload test</button>
		<div id="container" class="dtbl-container" style="width: 800px; height: 400px;">
			<table id="table-test" class="cell-border compact hover" style="width: 100%; border-bottom: 1px solid #ddd;">
				<thead>
					<tr>
						<th>Tag</th>
						<th>User ID</th>
						<th>User Group</th>
						<th>User Name</th>
						<th>wow</th>
					</tr>
				</thead>
			</table>
		</div>
		<div id="text" style="border: 1px solid black; width: 800px; height: 25px; margin-bottom: 10px;"></div>
		<!-- <div id="container2" class="dtbl-container" style="width: 800px; height: 400px;"></div> -->
	</body>
	<script type="text/javascript" src="js/util-test/util-test.js"></script>
</html>