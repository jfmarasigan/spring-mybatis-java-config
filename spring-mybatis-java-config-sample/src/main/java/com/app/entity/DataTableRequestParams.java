package com.app.entity;

public class DataTableRequestParams {
	private Integer draw;

	private Integer start;

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
		return start;
	}

	public void setStart(Integer start) {
		this.start = start + 1;
	}

	public Integer getLength() {
		return length;
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
		return this.start + this.length;
	}

}
