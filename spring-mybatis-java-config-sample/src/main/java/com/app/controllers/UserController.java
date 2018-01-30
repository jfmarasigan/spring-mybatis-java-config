package com.app.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.app.entity.User;
import com.app.service.UserService;
import com.app.tablefilters.UsersFilters;
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
		System.out.println("in here");
		return "home";
	}

	@RequestMapping("/getUser")
	public @ResponseBody String getUser(Integer draw, Integer start, Integer length, String userQuery,
			@RequestParam("search[value]") String search) throws JsonProcessingException {
		ObjectNode root = JsonNodeFactory.instance.objectNode();
		System.out.println("start: " + start + ", draw: " + draw + ", length: " + length);
		System.out.println(search);
		User user = service.getUser(userQuery);
		root.put("users", JSONMapper.writeValueAsString(user));
		root.put("draw", draw);
		root.put("recordsTotal", 10);
		root.put("recordsFiltered", 1);
		return JSONMapper.writeValueAsString(root);
	}

	@RequestMapping("/getAll")
	public ResponseEntity<String> getAll() throws JsonProcessingException {
		ObjectNode root = JsonNodeFactory.instance.objectNode();
		List<User> users = service.getAll();
		root.put("users", JSONMapper.writeValueAsString(users));

		return new ResponseEntity<String>(JSONMapper.writeValueAsString(root), HttpStatus.OK);
	}
	
	@RequestMapping("/get-all")
	public ResponseEntity<String> getAll(Integer draw, Integer start, Integer length) throws JsonProcessingException {
		ObjectNode root = JsonNodeFactory.instance.objectNode();
		List<User> users = service.getAll1(start + 1, length);
		root.put("draw", draw);
		root.put("recordsTotal", service.getTotalRecords(users));
		root.put("recordsFiltered", service.getTotalRecords(users));
		root.put("users", JSONMapper.writeValueAsString(users));
		root.put("filters", JSONMapper.writeValueAsString(UsersFilters.values()));
		return new ResponseEntity<String>(JSONMapper.writeValueAsString(root), HttpStatus.OK);
	}

	@RequestMapping("/wee")
	public @ResponseBody String getwee() throws JsonProcessingException {
		ObjectNode root = JsonNodeFactory.instance.objectNode();
		root.put("wee", service.getOne("JDANIEL"));

		return JSONMapper.writeValueAsString(root);
	}

}
