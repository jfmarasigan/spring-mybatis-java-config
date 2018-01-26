package com.app.mappers;

import java.util.List;

import com.app.entity.User;

public interface UserMapper {

	List<User> getAll();
	
	User getUser(String userId);
	
	String getOne(String userId);
}
