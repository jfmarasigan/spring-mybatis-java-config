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
		System.out.println("initStart:" + this.start);
		Integer start = this.start == null ? 0 : this.start;
		return start + 1;
	}

	public void setStart(Integer start) {
		System.out.println("setStart: " + start);
		this.start = start;
	}

	public Integer getLength() {
		return length;
	}

	public void setLength(Integer length) {
		System.out.println("setLength: " + length);
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
		Integer start = this.start == null ? 1 : this.start;
		Integer length = this.length == null ? 10 : this.length;
		return start + length;
	}

}
