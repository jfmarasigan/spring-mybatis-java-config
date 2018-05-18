package com.app.entity;

import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;

/**
 * entity used for Tabulator data generation<br/>
 * requires Jackson JSON library for {@link ObjectNode} generation
 * 
 * @param <E> the type of data rows maintained by this entity
 * @param <F> the enum type of filters used in the Tabulator custom filter tool;
 *            no need to include this if no filters are to be used
 *
 * @author Daniel Marasigan
 */
public class TabulatorResponseEntity<E, F extends Enum<?>> {
	private Integer count;
	private List<E> rows;
	private Integer pageSize;
	private F[] filters;

	/**
	 * @param count total number of records, without the limitations of pagination, retrieved
	 * @param rows list of rows to be displayed; usually has size equivalent to the page size
	 * @param filters an array of filters used by the tabulator builder
	 * @param pageSize number of rows that a page will have  
	 * */
	public TabulatorResponseEntity(Integer count, List<E> rows, F[] filters, Integer pageSize) {
		this.count = count;
		this.rows = rows;
		this.filters = filters;
		this.pageSize = pageSize;
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
	
	public Integer getLastPage() {
		int totalRecords = 0;		
		if (!rows.isEmpty()) {
			totalRecords = count;
		}
		
		int approxPages = totalRecords / this.pageSize;
		
		int extraPages = 0;		
		if (totalRecords % this.pageSize > 0) {
			extraPages = 1;
		}
		
		return approxPages + extraPages;
	}

	public ObjectNode toJsonNode() {
		ObjectNode node = JsonNodeFactory.instance.objectNode();
		ObjectMapper mapper = new ObjectMapper();
		
		node.put("count", this.count);
		ArrayNode dataRows = mapper.valueToTree(this.rows);
		node.putArray("data").addAll(dataRows);
		ArrayNode dataFilters = mapper.valueToTree(this.filters);
		node.putArray("filters").addAll(dataFilters);
		
		node.put("last_page", getLastPage());
		
		return node;
	}
}
