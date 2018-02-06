package com.app.service.datatables;

import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Test;

import com.app.service.DataTablesService;
import com.app.service.DataTablesServiceImpl;
import com.app.tablefilters.FilterTypes;

public class ValidDecimalTest {
	
	private DataTablesService service;
	
	@Before
	public void init() {
		service = new DataTablesServiceImpl();
	}
	
	@Test
	public void isValidDecimal() {
		assertEquals(true, service.validate("0.2", FilterTypes.DECIMAL));
	}
	
	@Test
	public void isInvalidDecimal() {
		assertEquals(false, service.validate("1a1.2", FilterTypes.DECIMAL));
	}
}
