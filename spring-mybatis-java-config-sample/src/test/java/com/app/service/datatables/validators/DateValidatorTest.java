package com.app.service.datatables.validators;

import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Test;

import com.app.service.DataTableValidator;
import com.app.service.DateValidator;

public class DateValidatorTest {

	private DataTableValidator validator;
	
	private static final String VALID = "valid";
	
	@Before
	public void init() {
		validator = new DateValidator();
	}
	
	@Test
	public void testValidDate() {
		assertEquals(VALID, validator.validate("12-31-2017"));
	}
	
	@Test
	public void testInvalidDate() {
		final String inv = "Date (12-35-2017) does not exist.";
		assertEquals(inv, validator.validate("12-35-2017"));
	}
	
	@Test
	public void testInvalidDateFormat() {
		final String inv = "Date format must not be empty.";
		assertEquals(inv, new DateValidator().validate("12-35-2017", ""));
	}
}
