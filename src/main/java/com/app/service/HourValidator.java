package com.app.service;

import java.util.Map;

import com.app.tablefilters.FieldTypes;

public class HourValidator implements Validator {
	
	public String validate(String keyword) {
		try {
			String[] parts = keyword.split("[: ]");
			Integer hour = Integer.parseInt(parts[0]);
			Integer min = Integer.parseInt(parts[1]);
			Integer sec = Integer.parseInt(parts[2]);
			
			if (hour < 1 || hour > 12) {
				return "Hour must be from 1 to 12";
			}
			if (min < 0 || min > 59) {
				return "Minutes must be from 0 to 59";
			}
			if (sec < 0 || sec > 59) {
				return "Seconds must be from 0 to 59";
			}
		} catch (NumberFormatException e) {
			return "Invalid format for time. Please check the regular expression matcher for time.";
		}
		
		return "valid";
	}

	@Override
	public String validate(Map<String, String> validationParams, FieldTypes fieldType) {
		return this.validate(validationParams.get("keyword"));
	}
}
