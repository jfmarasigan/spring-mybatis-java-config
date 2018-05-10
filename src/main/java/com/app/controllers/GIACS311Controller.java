package com.app.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.app.entity.DataTableResponseEntity;
import com.app.entity.GIACChartOfAccts;
import com.app.entity.GIACS311DTParams;
import com.app.service.GIACS311Service;
import com.app.tablefilters.GIACS311TGFilters;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;

@Controller
@RequestMapping(value = { "giacs311", "/ac/giacs311" })
public class GIACS311Controller {

	private GIACS311Service service;
	private static final ObjectMapper MAPPER = new ObjectMapper();

	@Autowired
	public GIACS311Controller(GIACS311Service service) {
		this.service = service;
	}

	@RequestMapping(value = { "show-giacs311" })
	public ResponseEntity<String> getGIACS311(GIACS311DTParams params) throws JsonProcessingException {
		ObjectNode root = JsonNodeFactory.instance.objectNode();
		List<GIACChartOfAccts> users = service.getGIACS311(params);

		Integer recordCount = service.getTotalRecords(users);
		
		DataTableResponseEntity<GIACChartOfAccts, GIACS311TGFilters> dtre = new DataTableResponseEntity<>(
				params.getDraw(), recordCount, recordCount, users, GIACS311TGFilters.values());
		
		root.setAll(dtre.toJSONNode());

		return new ResponseEntity<>(MAPPER.writeValueAsString(root), HttpStatus.OK);
	}

	@RequestMapping(value = { "tb-giacs311" })
	public ResponseEntity<String> giacs311(GIACS311DTParams params) throws JsonProcessingException {
		ObjectNode root = JsonNodeFactory.instance.objectNode();
		List<GIACChartOfAccts> users = service.getGIACS311(params);
		
		root.put("count", service.getTotalRecords(users));
		root.put("rows", MAPPER.writeValueAsString(users));
		ArrayNode data = MAPPER.valueToTree(users);
		root.putArray("data").addAll(data);
		ArrayNode filters = MAPPER.valueToTree(GIACS311TGFilters.values());
		root.putArray("filters").addAll(filters);
		root.put("last_page", 295);
		
		return new ResponseEntity<>(MAPPER.writeValueAsString(root), HttpStatus.OK);
	}
}
