package com.app.service.datatables;

import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Test;

import com.app.service.DataTablesService;
import com.app.service.DataTablesServiceImpl;
import com.app.tablefilters.DataTableFilterTypes;

public class ValidWildcardNumberTest {

	private DataTablesService service;
	
	@Before
	public void init() {
		service = new DataTablesServiceImpl();
	}
	
	@Test
	public void testNoWildcardNumber() {
		assertEquals("valid", service.validate("23", DataTableFilterTypes.WILDCARD_NON_NEG_WHOLE_NUMBER));
	}
	
	@Test
	public void testNumberWithStartingWildcard() {
		assertEquals("valid", service.validate("%23", DataTableFilterTypes.WILDCARD_NON_NEG_WHOLE_NUMBER));
	}
	
	@Test
	public void testNegNumberWithStartingWildcard() {
		assertEquals("valid", service.validate("%-23", DataTableFilterTypes.WILDCARD_NON_NEG_WHOLE_NUMBER));
	}
	
	@Test
	public void testNumberWithEndingWildcard() {
		assertEquals("valid", service.validate("23%", DataTableFilterTypes.WILDCARD_NON_NEG_WHOLE_NUMBER));
	}
	
	@Test
	public void testNegNumberWithEndingWildcard() {
		assertEquals("valid", service.validate("-23%", DataTableFilterTypes.WILDCARD_NON_NEG_WHOLE_NUMBER));
	}
	
	@Test
	public void testNumberWithMidWildCard() {
		assertEquals("valid", service.validate("23%23", DataTableFilterTypes.WILDCARD_NON_NEG_WHOLE_NUMBER));
	}
	
	@Test
	public void testNumberWithAllWildCard() {
		assertEquals("valid", service.validate("%23%23%", DataTableFilterTypes.WILDCARD_NON_NEG_WHOLE_NUMBER));
	}
}
