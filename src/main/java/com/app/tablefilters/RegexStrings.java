package com.app.tablefilters;

public enum RegexStrings {
	NONE(null),
	// numeric
	INTEGER("^[-]?\\d+"),
	POSITIVE_INTEGER("^\\d+"),
	DECIMAL("^[-]?\\d+([.]\\d+)?"),
	POSITIVE_DECIMAL("^\\d+([.]\\d+)?"),
	POSITIVE_WILDCARDED_WHOLE_NUM("^[%_]?[-]?\\d+[%_]?\\d+[%_]?"),
	
	// tagging
	YES_NO("^(y|n|Y|n)"),
	
	// date and time
	MM_DD_YYYY_DATE("^\\d{2}-\\d{2}-\\d{4}"),
	AM_TIME_FORMAT("^\\d{2}:\\d{2}:\\d{2}\\s(AM|am|PM|pm)");
	;
	
	private String regexString;
	
	RegexStrings(String regexString) {
		this.regexString = regexString;
	}
	
	public String getRegexString() {
		return this.regexString;
	}
}
