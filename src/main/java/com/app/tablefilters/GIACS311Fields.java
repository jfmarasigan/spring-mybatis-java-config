package com.app.tablefilters;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum GIACS311Fields {
	
	GL_ACCT_CATEGORY("glAcctCategory", FieldTypes.POSITIVE_WHOLE_NUMBER),
	GL_CONTROL_ACCT("glControlAcct", FieldTypes.POSITIVE_WHOLE_NUMBER),
	GL_SUB_ACCT_1("glSubAcct1", FieldTypes.POSITIVE_WHOLE_NUMBER),
	GL_SUB_ACCT_2("glSubAcct2", FieldTypes.POSITIVE_WHOLE_NUMBER),
	GL_SUB_ACCT_3("glSubAcct3", FieldTypes.POSITIVE_WHOLE_NUMBER),
	GL_SUB_ACCT_4("glSubAcct4", FieldTypes.POSITIVE_WHOLE_NUMBER),
	GL_SUB_ACCT_5("glSubAcct5", FieldTypes.POSITIVE_WHOLE_NUMBER),
	GL_SUB_ACCT_6("glSubAcct6", FieldTypes.POSITIVE_WHOLE_NUMBER),
	GL_SUB_ACCT_7("glSubAcct7", FieldTypes.POSITIVE_WHOLE_NUMBER)
	
	;
	
	private String id;
	private FieldTypes fieldType; 
	
	GIACS311Fields(String id, FieldTypes fieldType) {
		this.id = id;
		this.fieldType = fieldType;
	}

	public String getId() {
		return id;
	}

	public FieldTypes getFieldType() {
		return fieldType;
	}
	
	
}
