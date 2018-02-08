package com.app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.app.service.DataTablesService;
import com.app.tablefilters.DataTableFilterTypes;

@Controller
@RequestMapping(value = {"data-tables"})
public class DataTablesController {
	
	private DataTablesService service;
	
	@Autowired
	public DataTablesController(DataTablesService service) {
		this.service = service;
	}
	
	@RequestMapping(value = {"validate-filter"})
	public ResponseEntity<String> validateFilter(String keyword, String filterType) {
		String result = service.validate(keyword, DataTableFilterTypes.valueOf(filterType));
		HttpStatus status = HttpStatus.OK;
		if (!"valid".equals(result)) {
			status = HttpStatus.NOT_ACCEPTABLE;
		}		
		return new ResponseEntity<String>(result, status);
	}
}
