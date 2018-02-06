package com.app.service;

import com.app.tablefilters.DataTableFilterTypes;

public interface DataTablesService {
	String validate(String keyword, DataTableFilterTypes filterType);
}
