package com.app.service.datatables;

import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Test;

import com.app.service.DataTablesService;
import com.app.service.DataTablesServiceImpl;
import com.app.tablefilters.FieldTypes;

public class ValidDecimalTest {
	
	private DataTablesService service;
	private static final String INVALID_DECIMAL = "must be a decimal number";
	
	@Before
	public void init() {
		service = new DataTablesServiceImpl();
	}
	
	@Test
	public void isValidDecimal() {
		assertEquals("valid", service.validate("0.2", FieldTypes.DECIMAL));
	}
	
	@Test
	public void isInvalidDecimal() {
		assertEquals(INVALID_DECIMAL, service.validate("1a1.2", FieldTypes.DECIMAL));
	}
}
