package com.app.controllers;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.app.service.ValidatorUtility;
import com.app.tablefilters.FieldTypes;

@Controller
public class ValidatorUtilityController {

	private ValidatorUtility service;

	@Autowired
	public ValidatorUtilityController(ValidatorUtility service) {
		this.service = service;
	}

	/**
	 * @param keyword main keyword to be validated
	 * @param optKeyword secondary keyword for validation (for example when comparing 2 date instances)
	 * @param filterType string that denotes the field type to be used when validating
	 * */
	@RequestMapping(value = { "validate" })
	public ResponseEntity<String> validateFilter(String keyword, String optKeyword, String filterType)
			throws IOException {
		String result = service.validate(keyword, optKeyword, FieldTypes.valueOf(filterType));
		HttpStatus status = HttpStatus.OK;
		if (!"valid".equals(result)) {
			status = HttpStatus.NOT_ACCEPTABLE;
		}
		return new ResponseEntity<String>(result, status);
	}
}
