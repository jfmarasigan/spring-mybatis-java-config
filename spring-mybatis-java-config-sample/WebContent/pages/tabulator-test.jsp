<html>
	<head>
		<title>Tabulator Test</title>
		<script type="text/javascript" src="js/jquery.min.js"></script>
		<script type="text/javascript" src="js/jquery-ui.min.js"></script>
		<link href="css/tabulator_simple.min.css" rel="stylesheet">
		<script type="text/javascript" src="js/tabulator.min.js"></script>
		<script type="text/javascript" src="js/TableBuilder.js"></script>
		<style type="text/css">
			body {
				font-family: Segoe UI;
			}
			
			#sample-table {
				width: 800px;
				height: 250px;
				/* border: 1px solid black; */
			}
			
			.tabulator {
				font-size: 11px;
			}
			
			/*
			#paging {
				height: 8%;
				margin-top: 2px;
			} 
			
			.table-pagination {
				padding: 5px 10px;
				box-sizing: border-box;
				border-top: 1px solid #999;
				background-color: #fff;
				text-align: right;
				color: #555;
				font-weight: 700;
				font-size: 11px; 
				white-space: nowrap;
				user-select: none;
				-ms-user-select: none;
				-moz-user-select: none;
				-khtml-user-select: none;
				-webkit-user-select: none;
				-o-user-select: none;
			}
			
			.tabulator-page {
				display: inline-block;
				margin: 0 2px;
				border: 1px solid #aaa;
				border-radius: 3px;
				padding: 2px 5px;
				background: hsla(0,0%,100%,.2);
				color: #555;
				font-family: inherit;
				font-weight: inherit;
				font-size: inherit;
			}
			
			.tabulator-page:disabled {
				opacity: .5;
			}
			
			*/
		</style>
	</head>
	<body>
	<button type="button" id="trigger">Trigger</button>
	<div id="main">
		<div id="sample-table">
		
		</div>
		<div id="paging" class="table-pagination"></div>
	</div>
	</body>
</html>

<script type="text/javascript" src="js/tabulator.builder.js"></script>
<script type="text/javascript" src="js/tabulator-sample.js"></script>