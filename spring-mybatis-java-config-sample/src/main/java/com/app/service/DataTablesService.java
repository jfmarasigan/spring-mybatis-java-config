package com.app.service;

import com.app.tablefilters.FilterTypes;

public interface DataTablesService {
	String validate(String keyword, FilterTypes filterType);
}
