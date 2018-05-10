package com.app.entity;

import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;

/**
 * entity used for Tabulator data generation; requires Jackson JSON library
 * 
 * @param <E>
 *            the type of data rows maintained by this entity
 * @param <F>
 *            the enum type of filters used in the Tabulator custom filter tool;
 *            no need to include this if no filters are to be used
 *
 * @author Daniel Marasigan
 */
public class TabulatorResponseEntity<E, F extends Enum<?>> {
	private Integer count;
	private List<E> rows;
	private F[] filters;

	public TabulatorResponseEntity(Integer count, List<E> rows, F[] filters) {
		this.count = count;
		this.rows = rows;
		this.filters = filters;
	}

	public Integer getCount() {
		return count;
	}

	public List<E> getRows() {
		return rows;
	}

	public F[] getFilters() {
		return filters;
	}

	public ObjectNode toJsonNode() {
		ObjectNode node = JsonNodeFactory.instance.objectNode();
		ObjectMapper mapper = new ObjectMapper();
		
		node.put("count", this.count);
		ArrayNode dataRows = mapper.valueToTree(this.rows);
		node.putArray("data").addAll(dataRows);
		ArrayNode dataFilters = mapper.valueToTree(this.filters);
		node.putArray("filters").addAll(dataFilters);
		
		return node;
	}
}
