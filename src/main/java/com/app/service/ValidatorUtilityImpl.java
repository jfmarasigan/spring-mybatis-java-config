package com.app.service;

import org.springframework.stereotype.Service;

import com.app.tablefilters.FieldTypes;

@Service
public class ValidatorUtilityImpl implements ValidatorUtility {

	@Override
	public String validate(String keyword, String optKeyword, FieldTypes filterType) {
		if (isEmpty(keyword) && isEmpty(filterType)) {
			return "Please check if your keyword and/or filter is not empty.";
		}
		if (FieldTypes.NONE != filterType && !keyword.matches(filterType.getRegexMatcher())) {
			return filterType.getNotMatchMessage();
		}
		
		if (FieldTypes.FORMATTED_DATE == filterType) {
			return new DateValidator().validate(keyword);
		} else if (FieldTypes.DATE_RANGE == filterType) {
			return new DateValidator().validDateRange(keyword, optKeyword);
		} else if (FieldTypes.FORMATTED_HOUR == filterType) {
			return new HourValidator().validate(keyword);
		} else if (FieldTypes.PERCENT == filterType) {
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
