package com.app.service;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.app.entity.User;
import com.app.entity.UserDTParams;

public interface UserService {

	List<User> getAll();
	
	List<User> getAll1(UserDTParams params);
	
	User getUser(@Param("userId") String userId);
	
	String getOne(@Param("userId") String userId);
	
	Integer getTotalRecords(List<User> users);
	
	Integer getTotalPages(int recordCount, int pageSize);
}
