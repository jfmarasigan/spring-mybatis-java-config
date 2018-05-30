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
import com.app.entity.UserDTParams;
import com.app.service.UserService;
import com.app.tablefilters.UsersFilters;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;

@Controller
public class UserController {

	private UserService service;

	private static final ObjectMapper JSON_MAPPER = new ObjectMapper();

	@Autowired
	public UserController(UserService service) {
		this.service = service;
	}

	@RequestMapping("/")
	public String showHome() {
		System.out.println("redirected to home");
		return "home";
	}

	@RequestMapping("/getUser")
	public @ResponseBody String getUser(Integer draw, Integer start, Integer length, String userQuery,
			@RequestParam("search[value]") String search) throws JsonProcessingException {
		ObjectNode root = JsonNodeFactory.instance.objectNode();
		System.out.println("start: " + start + ", draw: " + draw + ", length: " + length);
		System.out.println(search);
		User user = service.getUser(userQuery);
		root.put("users", JSON_MAPPER.writeValueAsString(user));
		root.put("draw", draw);
		root.put("recordsTotal", 10);
		root.put("recordsFiltered", 1);
		return JSON_MAPPER.writeValueAsString(root);
	}

	@RequestMapping("/getAll")
	public ResponseEntity<String> getAll() throws JsonProcessingException {
		ObjectNode root = JsonNodeFactory.instance.objectNode();
		List<User> users = service.getAll();
		root.put("users", JSON_MAPPER.writeValueAsString(users));

		return new ResponseEntity<>(JSON_MAPPER.writeValueAsString(root), HttpStatus.OK);
	}
	
	@RequestMapping("/get-all")
	public ResponseEntity<String> getAll(UserDTParams params) //(Integer draw, Integer start, Integer length, String sortColumn, String ascDescFlg) 
			throws JsonProcessingException {
		ObjectNode root = JsonNodeFactory.instance.objectNode();
		List<User> users = service.getAll1(params);
		
		root.put("draw", params.getDraw());
		root.put("recordsTotal", service.getTotalRecords(users));
		root.put("recordsFiltered", service.getTotalRecords(users));
		root.put("rows", JSON_MAPPER.writeValueAsString(users));
		root.put("filters", JSON_MAPPER.writeValueAsString(UsersFilters.values()));
		root.put("bool", false);
		return new ResponseEntity<>(JSON_MAPPER.writeValueAsString(root), HttpStatus.OK);
	}
	
	@RequestMapping("/get-users")
	public ResponseEntity<String> getUsers (UserDTParams params)
			throws JsonProcessingException {
		ObjectNode root = JsonNodeFactory.instance.objectNode();
		List<User> users = service.getAll1(params);
		System.out.println(service.getTotalRecords(users));
		root.put("last_page", service.getTotalPages(service.getTotalRecords(users), 10));
		root.put("count", service.getTotalRecords(users));
		ArrayNode data = JSON_MAPPER.valueToTree(users);
		root.putArray("data").addAll(data);
		ArrayNode filters = JSON_MAPPER.valueToTree(UsersFilters.values());
		root.putArray("filters").addAll(filters);
		return new ResponseEntity<>(JSON_MAPPER.writeValueAsString(root), HttpStatus.OK);
	}

	@RequestMapping("/wee")
	public @ResponseBody String getwee() throws JsonProcessingException {
		ObjectNode root = JsonNodeFactory.instance.objectNode();
		root.put("wee", service.getOne("JDANIEL"));

		return JSON_MAPPER.writeValueAsString(root);
	}
	
	@RequestMapping(value = {"/util-test"})
	public String gotoutiltest() {
		System.out.println("redirected to util-test");
		return "util-test";
	}
	
	@RequestMapping(value = {"/tabulator-test"})
	public String gototabulatortest() {
		System.out.println("redirected to tabulator-test");
		return "tabulator-test";
	}
	
	@RequestMapping(value = {"/test"})
	public String gototest() {
		System.out.println("redirected to tabulator-test");
		return "giacs311";
	}
	
	@RequestMapping(value = {"/test1112"})
	public void testSave() throws Exception {
		service.testSave();
	}
}
