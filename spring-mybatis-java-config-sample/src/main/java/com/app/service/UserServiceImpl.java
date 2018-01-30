package com.app.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
	public List<User> getAll1(Integer start, Integer pageLength) {
		Map<String, String> params = new HashMap<>();
		params.put("start", start.toString());
		
		Integer end = start + pageLength;
		params.put("end", end.toString());
		
		return mapper.getAll1(params);
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

	@Override
	public Integer getTotalRecords(List<User> users) {
		return users.get(1).getTotalRecords();
	}

}
