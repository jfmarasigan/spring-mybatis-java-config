package com.app.service;

import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.Date;

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
		ParsePosition pp = new ParsePosition(0);
		Date date = format.parse(keyword, pp);

		if (date != null) {
			return "valid";
		} else {
			return "Invalid date or wrong date format";
		}
	}
	
	public boolean isValid(String keyword, String dateFormat) {
		if (dateFormat == null || "".equals(dateFormat.trim())) {
			return false;
		}
		
		SimpleDateFormat format = new SimpleDateFormat(dateFormat);
		format.setLenient(false);
		ParsePosition pp = new ParsePosition(0);
		Date date = format.parse(keyword, pp);

		if (date != null) {
			return true;
		} else {
			return false;
		}
	}
}
