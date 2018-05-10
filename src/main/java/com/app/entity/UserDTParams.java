package com.app.entity;

public class UserDTParams extends DataTableRequestParams {
	private String userId;

	private String userName;

	private Integer userGrp;

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public Integer getUserGrp() {
		return userGrp;
	}

	public void setUserGrp(Integer userGrp) {
		this.userGrp = userGrp;
	}
}
