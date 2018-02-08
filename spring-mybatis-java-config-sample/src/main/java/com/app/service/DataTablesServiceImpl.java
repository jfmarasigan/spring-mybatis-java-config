package com.app.service;

import org.springframework.stereotype.Service;

import com.app.tablefilters.DataTableFilterTypes;

@Service
public class DataTablesServiceImpl implements DataTablesService {

	@Override
	public String validate(String keyword, DataTableFilterTypes filterType) {
		if (isEmpty(keyword) && isEmpty(filterType)) {
			return "Please check if your keyword and/or filter is not empty.";
		}
		if (DataTableFilterTypes.NONE != filterType && !keyword.matches(filterType.getRegexMatcher())) {
			return filterType.getNotMatchMessage();
		}		
		if (DataTableFilterTypes.FORMATTED_DATE == filterType) {
			return new DateValidator().validate(keyword, null);
		} else if (DataTableFilterTypes.FORMATTED_HOUR == filterType) {
			return new HourValidator().validate(keyword);
		} else if (DataTableFilterTypes.PERCENT == filterType) {
			return new PercentValidator().validate(keyword);
		} else {
			return "valid";
		}
	}

	public boolean isEmpty(String str) {
		return str == null || str.trim().isEmpty();
	}
	
	private boolean isEmpty(DataTableFilterTypes filterType) {
		return filterType == null;
	}
	
}
