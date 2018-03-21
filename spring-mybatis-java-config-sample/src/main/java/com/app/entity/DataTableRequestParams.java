package com.app.entity;

public class DataTableRequestParams {
	private Integer draw;

	private Integer start;

	private Integer end;

	private Integer length;

	private String sortColumn;

	private String ascDescFlg;

	public Integer getDraw() {
		return draw;
	}

	public void setDraw(Integer draw) {
		this.draw = draw;
	}

	public Integer getStart() {
		return nvl(this.start, 1);
	}

	public void setStart(Integer start) {
		this.start = start;
	}

	public Integer getLength() {
		return nvl(this.length, 10);
	}

	public void setLength(Integer length) {
		this.length = length;
	}

	public String getSortColumn() {
		return sortColumn;
	}

	public void setSortColumn(String sortColumn) {
		this.sortColumn = sortColumn;
	}

	public String getAscDescFlg() {
		return ascDescFlg;
	}

	public void setAscDescFlg(String ascDescFlg) {
		this.ascDescFlg = ascDescFlg;
	}

	public Integer getEnd() {		
		return nvl(this.end, this.getStart() + this.getLength());
	}

	public void setEnd(Integer end) {
		this.end = end;
	}

	public <T> T nvl(T value, T replacement) {
		return value != null ? value : replacement;
	}
	
}
