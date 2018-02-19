package com.app.service.datatables.validators;

import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Test;

import com.app.service.HourValidator;

public class HourValidatorTest {

	private HourValidator validator;
	
	private static final String VALID = "valid";
	private static final String NOT_IN_RANGE_HOUR = "Hour must be from 1 to 12";
	private static final String NOT_IN_RANGE_MIN = "Minutes must be from 0 to 59";
	private static final String NOT_IN_RANGE_SEC = "Seconds must be from 0 to 59";
	private static final String INVALID_FORMAT = "Invalid format for time. Please check the regular expression matcher for time.";
	
	@Before
	public void init() {
		validator = new HourValidator();
	}
	
	@Test
	public void testValidTime() {
		assertEquals(VALID, validator.validate("12:30:59 PM"));
	}
	
	@Test
	public void testInvalidHour() {
		assertEquals(NOT_IN_RANGE_HOUR, validator.validate("13:30:59 PM"));
	}
	
	@Test
	public void testInvalidMin() {
		assertEquals(NOT_IN_RANGE_MIN, validator.validate("12:100:59 PM"));
	}
	
	@Test
	public void testInvalidSec() {
		assertEquals(NOT_IN_RANGE_SEC, validator.validate("12:30:100 PM"));
	}
	
	@Test
	public void testInvalidFormat() {
		assertEquals(INVALID_FORMAT, validator.validate("12:30;59 PM"));
	}
}
