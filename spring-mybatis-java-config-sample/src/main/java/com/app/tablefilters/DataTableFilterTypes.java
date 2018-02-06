package com.app.tablefilters;

public enum DataTableFilterTypes {
	NONE(null, null),
	DECIMAL("^[-]?\\d+([.]\\d+)?", "must be a decimal number"),
	POSITIVE_DECIMAL("^\\d+([.]\\d+)?", "must be a non-negative decimal number"),
	WHOLE_NUMBER("^[-]?\\d+", "must be a whole number"),
	POSITIVE_WHOLE_NUMBER("", "must be a non-negative whole number"),
	FORMATTED_DATE("", "Date must be entered in MM-DD-YYYY format."),
	FORMATTED_HOUR("", "Time must be entered in HH:MI:SS AM format."),
	PERCENT("", "must be a non negative number and is less than or equal to 100"),
	WILDCARD_NON_NEG_WHOLE_NUMBER("^[%_]?[-]?\\d+[%_]?\\d+[%_]?", "must be a non-negative number");
	
	private String regexMatcher;
	private String notMatchMessage;
	
	DataTableFilterTypes(String regexMatcher, String isInvalidMessage){
		this.regexMatcher = regexMatcher;
		this.notMatchMessage = isInvalidMessage;
	}
	
	public String getRegexMatcher() {
		return this.regexMatcher;
	}

	public String getNotMatchMessage() {
		return notMatchMessage;
	}
}
