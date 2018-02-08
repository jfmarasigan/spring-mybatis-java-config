package com.app.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;

public class DateValidator implements DataTableValidator {
	
	@Override
	public String validate(String keyword) {
		return this.validate(keyword, "MM-dd-yyyy");
	}
	
	public String validate(String keyword, String dateFormat) {
		if (dateFormat == null || "".equals(dateFormat.trim())) {
			return "Date format must not be empty.";
		}
		
		SimpleDateFormat format = new SimpleDateFormat(dateFormat);
		format.setLenient(false);
		
		try {
			format.parse(keyword);
		} catch (ParseException e) {
			return "Date (" + keyword + ") does not exist.";
		}
		
		return "valid";
	}
}
