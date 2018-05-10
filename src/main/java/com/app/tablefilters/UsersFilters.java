package com.app.tablefilters;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum UsersFilters {
	USER_ID("userId", "User ID", FieldTypes.NONE),
	USER_GRP("userGrp", "User Group", FieldTypes.POSITIVE_WHOLE_NUMBER),
	USER_NAME("userName", "User Name", FieldTypes.NONE);
	
	private String key;
	private String optName;
	private FieldTypes filterType;
	
	UsersFilters(String key, String optName, FieldTypes filterType) {
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
