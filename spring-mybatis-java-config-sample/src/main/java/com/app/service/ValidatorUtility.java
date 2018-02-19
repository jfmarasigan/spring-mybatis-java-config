package com.app.service;

import com.app.tablefilters.FieldTypes;

public interface ValidatorUtility {
	String validate(String keyword, String optKeyword, FieldTypes filterType);
}
