package com.app.service;

import java.text.ParseException;
import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import com.app.tablefilters.FieldTypes;

public class DateValidator implements Validator {
	
	private String dateFormat;
	
	public DateValidator() {
		this.dateFormat = "MM-dd-yyyy";
	}
	
	public DateValidator(String dateFormat) {
		this.dateFormat = dateFormat;
	}
	
	public String validate(String keyword) {
		if (dateFormat == null || "".equals(dateFormat.trim())) {
			return "Date format must not be empty.";
		}
		
		SimpleDateFormat format = new SimpleDateFormat(dateFormat);
		format.setLenient(false);
		ParsePosition pp = new ParsePosition(0);
		
		Integer keywordLength = keyword.length();
		Date date = format.parse(keyword, pp);

		return date != null && keywordLength != pp.getIndex() + 1 ? "valid" : "Invalid date or wrong date format";
	}

	public boolean isValidDate(String keyword) {
		return "valid".equals(this.validate(keyword));
	}
	
	public boolean isValidDateRange(String startDate, String endDate) throws ParseException {
		if (this.isValidDate(startDate) && this.isValidDate(endDate)) {
			SimpleDateFormat sdf = new SimpleDateFormat(dateFormat);
			Date start = sdf.parse(startDate);
			Date end = sdf.parse(endDate);
			return start.before(end);
		} else {
			return false;
		}
	}
	
	public String validDateRange(String startDate, String endDate) {
		try {
			return isValidDateRange(startDate, endDate) ? "valid" : "Start date earlier than end date";
		} catch (ParseException e) {
			return "Error parsing date : " + e.getMessage();
		}
	}

	@Override
	public String validate(Map<String, String> validationParams, FieldTypes fieldType) {
		String keyword = validationParams.get("keyword");
		String startDate = validationParams.get("startDate");
		String endDate = validationParams.get("endDate");
		
		if (FieldTypes.FORMATTED_DATE.equals(fieldType)) {
			return this.validate(keyword);
		} else if (FieldTypes.DATE_RANGE.equals(fieldType)) {
			return this.validDateRange(startDate, endDate);
		}
		
		return "Invalid or unhandled fileter type validation";
	}
}
