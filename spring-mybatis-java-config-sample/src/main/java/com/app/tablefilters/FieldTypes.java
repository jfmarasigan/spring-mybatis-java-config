package com.app.tablefilters;

public enum FieldTypes {
	NONE(RegexStrings.NONE, null),
	// numerics
	DECIMAL(RegexStrings.DECIMAL, "must be a decimal number"),
	POSITIVE_DECIMAL(RegexStrings.POSITIVE_DECIMAL, "must be a non-negative decimal number"),
	WHOLE_NUMBER(RegexStrings.INTEGER, "must be a whole number"),
	POSITIVE_WHOLE_NUMBER(RegexStrings.POSITIVE_INTEGER, "must be a non-negative whole number"),
	PERCENT(RegexStrings.POSITIVE_INTEGER, "must be a non negative number and is less than or equal to 100"),
	PERCENT_MORE_THAN_ZERO(RegexStrings.POSITIVE_INTEGER, "must be a non negative number and is less than or equal to 100"),
	WILDCARD_NON_NEG_WHOLE_NUMBER(RegexStrings.POSITIVE_WILDCARDED_WHOLE_NUM, "must be a non-negative number"),
	// tags
	CHECKBOX(RegexStrings.YES_NO, "must be Y / N"),
	// date and time
	FORMATTED_DATE(RegexStrings.MM_DD_YYYY_DATE, "Date must be entered in MM-DD-YYYY format."),
	DATE_RANGE(RegexStrings.MM_DD_YYYY_DATE, "Date must be entered in MM-DD-YYYY format."),
	FORMATTED_HOUR(RegexStrings.AM_TIME_FORMAT, "Time must be entered in HH:mm:ss AM format e.g. 12:30:59 PM.")
	;

	private String regexMatcher;
	private String notMatchMessage;
	
	FieldTypes(RegexStrings regexString, String notMatchMessage){
		this.regexMatcher = regexString.getRegexString();
		this.notMatchMessage = notMatchMessage;
	}
	
	public String getRegexMatcher() {
		return this.regexMatcher;
	}

	public String getNotMatchMessage() {
		return notMatchMessage;
	}
}
