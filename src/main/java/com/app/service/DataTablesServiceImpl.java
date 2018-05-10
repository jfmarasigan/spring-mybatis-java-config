package com.app.service;

import org.springframework.stereotype.Service;

import com.app.tablefilters.FieldTypes;

@Service
public class DataTablesServiceImpl implements DataTablesService {

	@Override
	public String validate(String keyword, FieldTypes fieldType) {
		if (isEmpty(keyword) && isEmpty(fieldType)) {
			return "Please check if your keyword and/or filter is not empty.";
		}
		if (FieldTypes.NONE != fieldType && !keyword.matches(fieldType.getRegexMatcher())) {
			return fieldType.getNotMatchMessage();
		}		
		if (FieldTypes.FORMATTED_DATE == fieldType) {
			return new DateValidator().validate(keyword);
		} else if (FieldTypes.FORMATTED_HOUR == fieldType) {
			return new HourValidator().validate(keyword);
		} else if (FieldTypes.PERCENT == fieldType) {
			return new RateValidator().validate(keyword);
		} else {
			return "valid";
		}
	}

	public boolean isEmpty(String str) {
		return str == null || str.trim().isEmpty();
	}
	
	private boolean isEmpty(FieldTypes filterType) {
		return filterType == null;
	}
	
}
