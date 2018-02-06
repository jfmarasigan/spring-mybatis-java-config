package com.app.service;

import com.app.tablefilters.FilterTypes;

public class DataTablesServiceImpl implements DataTablesService {

	@Override
	public String validate(String keyword, FilterTypes filterType) {
		if (isEmpty(keyword) && isEmpty(filterType)) {
			return "Please check if your keyword and/or filter is not empty.";
		}
		
		String filter = filterType.toString();
		boolean hasValidFormat = FilterTypes.NONE != filterType || keyword.matches(filterType.getRegexMatcher());
		
		if (!hasValidFormat) {
			return filterType.getIsInvalidMessage();
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
	
	private boolean isEmpty(FilterTypes filterType) {
		return filterType == null;
	}
}
