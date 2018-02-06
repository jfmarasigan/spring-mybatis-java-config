package com.app.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.app.service.DataTablesService;

@Controller
@RequestMapping(value = {"dt"})
public class DataTablesController {
	
	private DataTablesService service;
	
	public DataTablesController(DataTablesService service) {
		this.service = service;
	}
}
