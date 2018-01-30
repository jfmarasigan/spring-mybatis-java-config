package com.app.entity;

import java.io.Serializable;

public class User implements Serializable{

	private static final long serialVersionUID = 1716955928654803827L;

	private String userId;
	
	private Integer userGrp;
	
	private String userName;
	
	private Integer totalRecords;
	
	private Integer recordsFiltered;

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public Integer getUserGrp() {
		return userGrp;
	}

	public void setUserGrp(Integer userGrp) {
		this.userGrp = userGrp;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public Integer getTotalRecords() {
		return totalRecords;
	}

	public void setTotalRecords(Integer totalRecords) {
		this.totalRecords = totalRecords;
	}

	public Integer getRecordsFiltered() {
		return recordsFiltered;
	}

	public void setRecordsFiltered(Integer recordsFiltered) {
		this.recordsFiltered = recordsFiltered;
	}
	
}
