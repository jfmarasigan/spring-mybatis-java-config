package com.app.entity;

import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;

/**
 * entity used for DataTables data generation
 * requires Jackson JSON library
 * 
 * @param <E> the type of data rows maintained by this entity
 * @param <F> the enum type of filters used in the DataTables custom filter
 *            tool; no need to include this if no filters are to be used
 *
 * @author Daniel Marasigan
 */
public class DataTableResponseEntity<E, F extends Enum<?>> {

	private Integer draw;
	private Integer recordsTotal;
	private Integer recordsFiltered;
	private List<E> rows;
	private F[] filters;

	public DataTableResponseEntity(Integer draw, Integer recordsTotal, Integer recordsFiltered, List<E> rows,
			F[] filters) {
		this.draw = draw;
		this.recordsTotal = recordsTotal;
		this.recordsFiltered = recordsFiltered;
		this.rows = rows;
		this.filters = filters;
	}
	
	public Integer getDraw() {
		return draw;
	}

	public Integer getRecordsTotal() {
		return recordsTotal;
	}

	public Integer getRecordsFiltered() {
		return recordsFiltered;
	}

	public List<E> getRows() {
		return rows;
	}

	public F[] getFilters() {
		return filters;
	}
	
	public ObjectNode toJSONNode() {
		ObjectNode root = JsonNodeFactory.instance.objectNode();
		ObjectMapper mapper = new ObjectMapper();
		
		root.put("draw", this.draw);
		root.put("recordsTotal", this.recordsTotal);
		root.put("recordsFiltered", this.recordsFiltered);
		
		ArrayNode dataRows = mapper.valueToTree(this.rows);
		root.putArray("rows").addAll(dataRows);
		
		ArrayNode dataFilters = mapper.valueToTree(this.filters);
		root.putArray("filters").addAll(dataFilters);
		
		return root;
	}
}
