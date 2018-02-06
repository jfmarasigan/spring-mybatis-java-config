package com.app.service.datatables;

import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Test;

import com.app.service.DataTablesService;
import com.app.service.DataTablesServiceImpl;
import com.app.tablefilters.FilterTypes;

public class ValidPositiveDecimalTest {
	
	private DataTablesService service;
	
	@Before
	public void init() {
		service = new DataTablesServiceImpl();
	}
	
	@Test
	public void isValidPositiveDecimal() {
		assertEquals(true, service.validate("1.2", FilterTypes.POSITIVE_DECIMAL));
	}
	
	@Test
	public void isInvalidPositiveDecimal() {
		assertEquals(false, service.validate("-1.2", FilterTypes.POSITIVE_DECIMAL));
	}
	
	@Test
	public void isInvalidDecimal() {
		assertEquals(false, service.validate("-1a1.2", FilterTypes.POSITIVE_DECIMAL));
	}
}
