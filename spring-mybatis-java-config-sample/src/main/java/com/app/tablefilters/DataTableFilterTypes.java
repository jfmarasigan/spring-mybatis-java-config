package com.app.tablefilters;

public enum DataTableFilterTypes {
	NONE(null, null),
	DECIMAL("^[-]?\\d+([.]\\d+)?", "must be a decimal number"),
	POSITIVE_DECIMAL("^\\d+([.]\\d+)?", "must be a non-negative decimal number"),
	WHOLE_NUMBER("^[-]?\\d+", "must be a whole number"),
	POSITIVE_WHOLE_NUMBER("^\\d+", "must be a non-negative whole number"),
	CHECKBOX("^(y|n|Y|n)", "must be Y / N"),
	FORMATTED_DATE("^\\d{2}-\\d{2}-\\d{4}", "Date must be entered in MM-DD-YYYY format."),
	FORMATTED_HOUR("^\\d{2}:\\d{2}:\\d{2}\\s(AM|am|PM|pm)", "Time must be entered in HH:mm:ss AM format e.g. 12:30:59 PM."),
	PERCENT("^\\d+", "must be a non negative number and is less than or equal to 100"),
	WILDCARD_NON_NEG_WHOLE_NUMBER("^[%_]?[-]?\\d+[%_]?\\d+[%_]?", "must be a non-negative number");
	
	private String regexMatcher;
	private String notMatchMessage;
	
	DataTableFilterTypes(String regexMatcher, String notMatchMessage){
		this.regexMatcher = regexMatcher;
		this.notMatchMessage = notMatchMessage;
	}
	
	public String getRegexMatcher() {
		return this.regexMatcher;
	}

	public String getNotMatchMessage() {
		return notMatchMessage;
	}
}
