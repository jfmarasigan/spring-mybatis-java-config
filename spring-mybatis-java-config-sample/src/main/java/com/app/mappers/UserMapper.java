package com.app.mappers;

import java.util.List;
import java.util.Map;

import com.app.entity.User;

public interface UserMapper {

	List<User> getAll();
	
	List<User> getAll1(Map<String, String> params);
	
	User getUser(String userId);
	
	String getOne(String userId);
}
