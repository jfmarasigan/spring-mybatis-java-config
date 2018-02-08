package com.app.entity;

public class DataTable {
	private Integer draw;
	
	private Integer start;
	
	private Integer length;

	public DataTable(Integer draw, Integer start, Integer length) {
		this.draw = draw;
		this.start = start;
		this.length = length;
	}

	public Integer getDraw() {
		return draw;
	}

/*	public void setDraw(Integer draw) {
		this.draw = draw;
	}*/

	public Integer getStart() {
		return start;
	}

/*	public void setStart(Integer start) {
		this.start = start;
	}*/

	public Integer getLength() {
		return length;
	}

/*	public void setLength(Integer length) {
		this.length = length;
	}*/

	public Integer getEnd() {
		return this.start + this.length;
	}

	
}
