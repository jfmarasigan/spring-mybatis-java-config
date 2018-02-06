package com.app.service;

import com.app.tablefilters.DataTableFilterTypes;

public class DataTablesServiceImpl implements DataTablesService {

	@Override
	public String validate(String keyword, DataTableFilterTypes filterType) {
		if (isEmpty(keyword) && isEmpty(filterType)) {
			return "Please check if your keyword and/or filter is not empty.";
		}
		
		String filter = filterType.toString();
		
		if (DataTableFilterTypes.NONE != filterType && !keyword.matches(filterType.getRegexMatcher())) {
			return filterType.getNotMatchMessage();
		}
		
		if ("FORMATTED_DATE".equals(filter)) {
			// check if valid date value
		} else if ("FORMATTED_HOUR".equals(filter)) {
			// check if valid hour value
		}
		
		return "valid";
	}

	private boolean isEmpty(String str) {
		return str == null || str.trim().isEmpty();
	}
	
	private boolean isEmpty(DataTableFilterTypes filterType) {
		return filterType == null;
	}
}
