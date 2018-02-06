package com.app.tablefilters;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum UsersFilters {
	USER_ID("userId", "User ID", FilterTypes.NONE),
	USER_GRP("userGrp", "User Group", FilterTypes.NONE),
	USER_NAME("userName", "User Name", FilterTypes.NONE);
	
	private String key;
	private String optName;
	private FilterTypes filterType;
	
	UsersFilters(String key, String optName, FilterTypes filterType) {
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
	
	public FilterTypes getFilterType() {
		return this.filterType;
	}
}
