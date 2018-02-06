package com.app.service.datatables;

import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Test;

import com.app.service.DataTablesService;
import com.app.service.DataTablesServiceImpl;
import com.app.tablefilters.FilterTypes;

public class EmptyValuesAndNoneFilterTest {

	private DataTablesService service;
	
	@Before
	public void init() {
		service = new DataTablesServiceImpl();
	}
	
	@Test
	public void testNullParams() {
		assertEquals(false, service.validate(null, null));
	}
	
	@Test
	public void testWhiteSpaceParams() {
		assertEquals(false, service.validate(" ", null));
	}
	
	@Test
	public void testEmptyStringParams() {
		assertEquals(false, service.validate("", null));
	}
	
	@Test
	public void testNoneFilterType() {
		assertEquals(true, service.validate("sdfdqd239eocdn_242ewd!##$2wgef", FilterTypes.NONE));
	}
}
