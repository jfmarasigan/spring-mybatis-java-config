<!DOCTYPE html>
<html>
	<head>
		<title>Test Page for DataTableBuilder</title>
		<link rel="stylesheet" type="text/css" href="css/datatables.min.css">
		<link rel="stylesheet" type="text/css" href="css/select.dataTables.min.css">
		<link rel="stylesheet" type="text/css" href="css/modal.css">
		<link rel="stylesheet" type="text/css" href="css/datatables.custom.css">
		
		<script type="text/javascript" src="js/jquery.min.js"></script>
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
		<div id="container" class="dtbl-container" style="width: 700px; height: 400px;">
			<table id="table-test" class="cell-border compact hover" style="width: 100%; border-bottom: 1px solid #ddd;">
				<thead>
					<tr>
						<th colspan="9" style="width: 338px;">GL Account Code</th>
						<th rowspan="2" style="width: 328px;">GL Account Name</th>
					</tr>
					<tr style="display: none;">
						<th>cat</th>
						<th>ctrl</th>
						<th>1</th>
						<th>2</th>
						<th>3</th>
						<th>4</th>
						<th>5</th>
						<th>6</th>
						<th>7</th>
					</tr>
				</thead>
			</table>
		</div>
		<div id="text" style="border: 1px solid black; width: 800px; min-height: 25px; margin-bottom: 10px; font-size: 11px;"></div>
	</body>
	<script type="text/javascript" src="js/test.js"></script>
</html>