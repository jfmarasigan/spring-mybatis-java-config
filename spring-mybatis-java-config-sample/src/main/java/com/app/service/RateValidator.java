package com.app.service;

public class RateValidator {

	public String validate(String keyword) {
		return this.validate(keyword, 0.0);
	}
	
	public String validate(String keyword, double start) {
		try {
			Double key = Double.parseDouble(keyword.replaceAll("%", ""));
			if (key < start || key > 100.0) {
				return "Rate should be from " + start + " to 100.";
			}
		} catch (NumberFormatException e) {
			return "Keyword entered (" + keyword + ") is an invalid rate format."; 
		}	
		
		return "valid";
	}
}
