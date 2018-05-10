package com.app.service;

import com.app.tablefilters.FieldTypes;

public interface DataTablesService {
	String validate(String keyword, FieldTypes filterType);
}
