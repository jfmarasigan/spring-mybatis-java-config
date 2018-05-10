package com.app.entity.test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import java.util.ArrayList;
import java.util.List;

import org.junit.Before;
import org.junit.Test;

import com.app.entity.DataTableResponseEntity;
import com.app.tablefilters.GIACS311TGFilters;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class DataTableResponseEntityTest {

	private DataTableResponseEntity<String, GIACS311TGFilters> dt;

	@Before
	public void initialize() {
		List<String> strings = new ArrayList<>();
		strings.add("string1");
		strings.add("string2");
		strings.add("string3");
		strings.add("string4");
		strings.add("string5");

		dt = new DataTableResponseEntity<String, GIACS311TGFilters>(1, 100, 100, strings, GIACS311TGFilters.values());
	}

	@Test
	public void createEntity() {
		int length = GIACS311TGFilters.values().length;
		assertEquals(Integer.valueOf(1), dt.getDraw());
		assertEquals(Integer.valueOf(100), dt.getRecordsFiltered());
		assertEquals(Integer.valueOf(100), dt.getRecordsTotal());
		assertEquals(Integer.valueOf(5), Integer.valueOf(dt.getRows().size()));
		assertEquals(Integer.valueOf(length), Integer.valueOf(dt.getFilters().length));
	}

	@Test
	public void jsonRepresentation() {
		ObjectNode node = dt.toJSONNode();

		assertEquals(Integer.valueOf(1), Integer.valueOf(node.get("draw").asInt()));
		assertEquals(Integer.valueOf(100), Integer.valueOf(node.get("recordsFiltered").asInt()));
		assertEquals(Integer.valueOf(100), Integer.valueOf(node.get("recordsTotal").asInt()));
		assertNotNull(node.get("rows"));
		assertTrue(node.get("rows").isArray());
		assertNotNull(node.get("filters"));
		assertTrue(node.get("filters").isArray());
	}
}
