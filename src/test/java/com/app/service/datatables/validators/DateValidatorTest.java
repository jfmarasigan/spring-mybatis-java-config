package com.app.service.datatables.validators;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import java.text.ParseException;

import org.junit.Before;
import org.junit.Test;

import com.app.service.DateValidator;

public class DateValidatorTest {

	private DateValidator validator;
	
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
		final String inv = "Invalid date or wrong date format";
		assertEquals(inv, validator.validate("12-35-2017"));
	}
	
	@Test
	public void testValidDateRange() {
		final String start = "01-01-2017";
		final String end = "12-31-2017";
		try {
			assertTrue(new DateValidator().isValidDateRange(start, end));
		} catch (ParseException e) {
			fail("Exception occurred: " + e.getMessage());
		}
	}
}
