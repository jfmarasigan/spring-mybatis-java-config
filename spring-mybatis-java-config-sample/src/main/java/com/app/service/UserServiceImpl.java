package com.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.entity.User;
import com.app.mappers.UserMapper;

@Service
public class UserServiceImpl implements UserService{
	
	private UserMapper mapper;
	
	@Autowired
	public UserServiceImpl(UserMapper mapper) {
		this.mapper = mapper;
	}
	
	@Override
	public List<User> getAll(){		
		return mapper.getAll();
	}
	
	@Override
	public User getUser(String userId) {
		return mapper.getUser(userId);
	}

	@Override
	public String getOne(String userId) {
		System.out.println("userId: " + userId);
		return mapper.getOne(userId);
	}
}
