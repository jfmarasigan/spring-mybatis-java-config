package com.app.tablefilters;

public enum FilterTypes {
	NONE(null, null),
	DECIMAL("^[-]?\\d+([.]\\d+)?", ""),
	POSITIVE_DECIMAL("^\\d+([.]\\d+)?", ""),
	WHOLE_NUMBER("^[-]?\\d+", ""),
	POSITIVE_WHOLE_NUMBER("", ""),
	FORMATTED_DATE("", ""),
	FORMATTED_HOUR("", ""),
	PERCENT("", ""),
	WILDCARDED_POSITIVE_WHOLE_NUMBER("^[%_]?[-]?\\d+[%_]?\\d+[%_]?", "");
	
	private String regexMatcher;
	private String isInvalidMessage;
	
	FilterTypes(String regexMatcher, String isInvalidMessage){
		this.regexMatcher = regexMatcher;
		this.isInvalidMessage = isInvalidMessage;
	}
	
	public String getRegexMatcher() {
		return this.regexMatcher;
	}

	public String getIsInvalidMessage() {
		return isInvalidMessage;
	}
}
