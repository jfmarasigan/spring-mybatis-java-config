package com.app.service.datatables;

import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Test;

import com.app.service.DataTablesService;
import com.app.service.DataTablesServiceImpl;
import com.app.tablefilters.FilterTypes;

public class ValidWholeNumber {
	
	private DataTablesService service;
	
	@Before
	public void init() {
		service = new DataTablesServiceImpl();
	}
	
	@Test 
	public void isValidWholeNumber() {
		assertEquals(true, service.validate("22", FilterTypes.WHOLE_NUMBER));
	}
	
	@Test
	public void isValidNegativeWholeNumber() {
		assertEquals(true, service.validate("-22", FilterTypes.WHOLE_NUMBER));
	}
	
	@Test
	public void isInvalidWholeNumberWithEndingStr() {
		assertEquals(false, service.validate("2a", FilterTypes.WHOLE_NUMBER));
	}
	
	@Test
	public void isInvalidWholeNumberWithStartString() {
		assertEquals(false, service.validate("a2", FilterTypes.WHOLE_NUMBER));
	}
	
	@Test
	public void isInvalidWholeNumberWithStrings() {
		assertEquals(false, service.validate("a2a", FilterTypes.WHOLE_NUMBER));
	}
	
	
}
