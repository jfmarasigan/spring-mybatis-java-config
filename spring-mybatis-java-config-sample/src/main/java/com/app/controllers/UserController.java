package com.app.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.app.entity.User;
import com.app.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;

@Controller
public class UserController {

	private UserService service;
	
	private static final ObjectMapper JSONMapper = new ObjectMapper();
	
	@Autowired
	public UserController(UserService service) {
		this.service = service;
	}
	
	@RequestMapping("/")
	public String showHome() {
		return "test";
	}
	
	@RequestMapping("/getUser")
	public @ResponseBody String getUser() throws JsonProcessingException {
		ObjectNode root = JsonNodeFactory.instance.objectNode();
		
		User user = service.getUser("JDANIEL");
		root.put("users", JSONMapper.writeValueAsString(user));
		/*root.put("userId", user.getUserId());
		root.put("userGrp", user.getUserGrp());
		root.put("userName", user.getUserName());*/
		
		return JSONMapper.writeValueAsString(root);
	}
	
	@RequestMapping("/getAll")
	public ResponseEntity<String> getAll() throws JsonProcessingException{
		ObjectNode root = JsonNodeFactory.instance.objectNode();
		List<User> users = service.getAll();
		root.put("users", JSONMapper.writeValueAsString(users));
		
		return new ResponseEntity<String>(JSONMapper.writeValueAsString(root), HttpStatus.OK);
	}
	
	@RequestMapping("/wee")
	public @ResponseBody String getwee() throws JsonProcessingException {
		ObjectNode root = JsonNodeFactory.instance.objectNode();
		root.put("wee", service.getOne("JDANIEL"));
		
		return JSONMapper.writeValueAsString(root);
	}
}
