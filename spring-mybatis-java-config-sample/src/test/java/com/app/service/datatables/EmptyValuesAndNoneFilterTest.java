package com.app.service.datatables;

import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Test;

import com.app.service.DataTablesService;
import com.app.service.DataTablesServiceImpl;
import com.app.tablefilters.DataTableFilterTypes;

public class EmptyValuesAndNoneFilterTest {

	private DataTablesService service;
	
	private static final String EMPTY = "Please check if your keyword and/or filter is not empty.";
	
	@Before
	public void init() {
		service = new DataTablesServiceImpl();
	}
	
	@Test
	public void testNullParams() {
		assertEquals(EMPTY, service.validate(null, null));
	}
	
	@Test
	public void testWhiteSpaceParams() {
		assertEquals(EMPTY, service.validate(" ", null));
	}
	
	@Test
	public void testEmptyStringParams() {
		assertEquals(EMPTY, service.validate("", null));
	}
	
	@Test
	public void testNoneFilterType() {
		assertEquals("valid", service.validate("sdfdqd239eocdn_242ewd!##$2wgef", DataTableFilterTypes.NONE));
	}
}
