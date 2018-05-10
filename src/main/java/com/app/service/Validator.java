package com.app.service;

import java.util.Map;

import com.app.tablefilters.FieldTypes;

public interface Validator {
	String validate(Map<String, String> validationParams, FieldTypes fieldType);
}
