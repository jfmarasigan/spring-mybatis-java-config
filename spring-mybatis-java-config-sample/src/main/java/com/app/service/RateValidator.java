package com.app.service;

import java.util.Map;

import com.app.tablefilters.FieldTypes;

public class RateValidator implements Validator {

	public String validate(String keyword) {
		return this.validate(keyword, 0.0);
	}
	
	public String validate(String keyword, double start) {
		try {
			Double key = Double.parseDouble(keyword.replaceAll("%", ""));
			if (key < start || key > 100.0) {
				return "Rate should be from " + start + " to 100.";
			}
		} catch (NumberFormatException e) {
			return "Keyword entered (" + keyword + ") is an invalid rate format."; 
		}	
		
		return "valid";
	}

	@Override
	public String validate(Map<String, String> validationParams, FieldTypes fieldType) {
		String start = validationParams.get("start");
		Double startNum = start != null ? Double.parseDouble(start) : 0.0; 
		return this.validate(validationParams.get("keyword"), startNum);
	}
}
