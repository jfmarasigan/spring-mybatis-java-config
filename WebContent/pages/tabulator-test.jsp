<html>
	<head>
		<title>Tabulator Test</title>
		<script type="text/javascript" src="js/jquery.min.js"></script>
		<script type="text/javascript" src="js/jquery-ui.min.js"></script>
		<link href="css/tabulator_simple.min.css" rel="stylesheet">
		<link rel="stylesheet" type="text/css" href="css/tabulator.custom.css">
		<script type="text/javascript" src="js/tabulator.min.js"></script>
		<style type="text/css">
			body {
				font-family: Segoe UI;
				font-size: 11px;
			}
			
			#sample-table, #sample-table2 {
				width: 700px;
				height: 300px;
				/* border: 1px solid black; */
			}
			
			.tabulator {
				font-size: 11px;
			}
						
			.tabulator-col-group-cols, 
			.tabulator-col-group-cols > div {
				visibility: hidden;
				height: 1px;
			}
		</style>
	</head>
	<body>
	<button type="button" id="trigger">Trigger</button>
	<select id="selQueryLevel">
		<option value=""></option>
		<option value="GLAC">GL_ACCT_CATEGORY</option>
		<option value="GLCA">GL_CONTROL_ACCT</option>
		<option value="GSA1">GL_SUB_ACCT_1</option>
		<option value="GSA2">GL_SUB_ACCT_2</option>
		<option value="GSA3">GL_SUB_ACCT_3</option>
		<option value="GSA4">GL_SUB_ACCT_4</option>
		<option value="GSA5">GL_SUB_ACCT_5</option>
		<option value="GSA6">GL_SUB_ACCT_6</option>
		<option value="GSA7">GL_SUB_ACCT_7</option>
	</select>
	<div id="main">
		<div id="sample-table">
		
		</div>
		<div id="sample-table2"></div>
	</div>
	</body>
</html>

<script type="text/javascript" src="js/tabulator.builder.js"></script>
<script type="text/javascript" src="js/tabulator-sample.js"></script>