package com.app.service.datatables.validators;

import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Test;

import com.app.service.RateValidator;

public class RateValidatorTest {
	private RateValidator validator;
	
	private static final String VALID = "valid";
	private static final String NOT_IN_RANGE = "Percent should be from 0 to 100.";	
	
	@Before
	public void init () {
		validator = new RateValidator();
	}
	
	@Test
	public void testValidPercentWithSymbol() {
		assertEquals(VALID, validator.validate("25%"));
	}
	
	@Test
	public void testValidPercentWithoutSymbol() {
		assertEquals(VALID, validator.validate("25"));
	}
	
	@Test
	public void testValidPercentDecimalWithSymbol() {
		assertEquals(VALID, validator.validate("25.5%"));
	}
	
	@Test
	public void testValidPercentDecimalWithoutSymbol() {
		assertEquals(VALID, validator.validate("25.5"));
	}
	
	@Test
	public void testInvalidPercentWithSymbol() {
		assertEquals(NOT_IN_RANGE, validator.validate("255%"));
	}
	
	@Test
	public void testInvalidPercentWithoutSymbol() {
		assertEquals(NOT_IN_RANGE, validator.validate("-1"));
	}
	
	@Test
	public void testInvalidPercentNotNumber() {
		final String resStrng = "Keyword entered (aaa) is an invalid percent format.";
		assertEquals(resStrng, validator.validate("aaa"));
	}
}
