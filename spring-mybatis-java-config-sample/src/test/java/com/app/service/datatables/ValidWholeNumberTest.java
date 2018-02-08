package com.app.service.datatables;

import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Test;

import com.app.service.DataTablesService;
import com.app.service.DataTablesServiceImpl;
import com.app.tablefilters.DataTableFilterTypes;

public class ValidWholeNumberTest {
	
	private DataTablesService service;
	
	@Before
	public void init() {
		service = new DataTablesServiceImpl();
	}
	
	@Test 
	public void isValidWholeNumber() {
		assertEquals(true, service.validate("22", DataTableFilterTypes.WHOLE_NUMBER));
	}
	
	@Test
	public void isValidNegativeWholeNumber() {
		assertEquals(true, service.validate("-22", DataTableFilterTypes.WHOLE_NUMBER));
	}
	
	@Test
	public void isInvalidWholeNumberWithEndingStr() {
		assertEquals(false, service.validate("2a", DataTableFilterTypes.WHOLE_NUMBER));
	}
	
	@Test
	public void isInvalidWholeNumberWithStartString() {
		assertEquals(false, service.validate("a2", DataTableFilterTypes.WHOLE_NUMBER));
	}
	
	@Test
	public void isInvalidWholeNumberWithStrings() {
		assertEquals(false, service.validate("a2a", DataTableFilterTypes.WHOLE_NUMBER));
	}
	
	
}
