package com.app.mappers;

import java.util.List;

import com.app.entity.User;
import com.app.entity.UserDTParams;

public interface UserMapper {

	List<User> getAll();
	
	List<User> getAll1(UserDTParams params);
	
	User getUser(String userId);
	
	String getOne(String userId);

	void testSave();
	
	void testSave2();
}
