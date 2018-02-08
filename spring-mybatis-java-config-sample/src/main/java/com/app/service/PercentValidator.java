package com.app.service;

public class PercentValidator implements DataTableValidator {

	@Override
	public String validate(String keyword) {
		try {
			Double key = Double.parseDouble(keyword.replaceAll("%", ""));
			if (key < 0.0 || key > 100.0) {
				return "Percent should be from 0 to 100.";
			}
		} catch (NumberFormatException e) {
			return "Keyword entered (" + keyword + ") is an invalid percent format."; 
		}	
		
		return "valid";
	}
}
