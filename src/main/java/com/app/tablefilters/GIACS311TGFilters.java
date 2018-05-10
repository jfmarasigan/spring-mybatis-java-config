package com.app.tablefilters;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum GIACS311TGFilters {
	GL_ACCT_NAME("glAcctName", "GL Account Name", FieldTypes.NONE),
	GL_ACCT_CAT("glAcctCategory", "GL Account Category", FieldTypes.WHOLE_NUMBER),
	GL_CTRL_ACCT("glControlAcct", "GL Control Account", FieldTypes.WHOLE_NUMBER),
	GL_SUB_ACCT_1("glSubAcct1", "GL Sub Account 1", FieldTypes.WHOLE_NUMBER),
	GL_SUB_ACCT_2("glSubAcct2", "GL Sub Account 2", FieldTypes.WHOLE_NUMBER),
	GL_SUB_ACCT_3("glSubAcct3", "GL Sub Account 3", FieldTypes.WHOLE_NUMBER),
	GL_SUB_ACCT_4("glSubAcct4", "GL Sub Account 4", FieldTypes.WHOLE_NUMBER),
	GL_SUB_ACCT_5("glSubAcct5", "GL Sub Account 5", FieldTypes.WHOLE_NUMBER),
	GL_SUB_ACCT_6("glSubAcct6", "GL Sub Account 6", FieldTypes.WHOLE_NUMBER),
	GL_SUB_ACCT_7("glSubAcct7", "GL Sub Account 7", FieldTypes.WHOLE_NUMBER)
	;
	
	private String key;
	private String optName;
	private FieldTypes filterType;
	
	GIACS311TGFilters(String key, String optName, FieldTypes filterType) {
		this.key = key;
		this.optName = optName;
		this.filterType = filterType;
	}
	
	public String getKey() {
		return this.key;
	}
	
	public String getOptName() {
		return this.optName;
	}
	
	public FieldTypes getFilterType() {
		return this.filterType;
	}
}
