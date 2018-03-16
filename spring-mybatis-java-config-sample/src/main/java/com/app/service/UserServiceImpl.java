package com.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.entity.User;
import com.app.entity.UserDTParams;
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
	public List<User> getAll1(UserDTParams params) {
		System.out.println("start: " + params.getStart());
		System.out.println("end: " + params.getEnd());
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
		return !users.isEmpty() ? users.get(0).getTotalRecords() : 0;
	}

	@Override
	public Integer getTotalPages(int recordCount, int pageSize) {
		System.out.println("recordCount: " + recordCount);
		System.out.println("pageSize: " + pageSize);
		return (recordCount / pageSize) + (recordCount % pageSize == 0 ? 0 : 1); 
	}

}
