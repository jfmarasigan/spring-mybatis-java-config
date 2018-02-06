package com.app.tablefilters;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum UsersFilters {
	USER_ID("userId", "User ID", DataTableFilterTypes.NONE),
	USER_GRP("userGrp", "User Group", DataTableFilterTypes.NONE),
	USER_NAME("userName", "User Name", DataTableFilterTypes.NONE);
	
	private String key;
	private String optName;
	private DataTableFilterTypes filterType;
	
	UsersFilters(String key, String optName, DataTableFilterTypes filterType) {
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
	
	public DataTableFilterTypes getFilterType() {
		return this.filterType;
	}
}
