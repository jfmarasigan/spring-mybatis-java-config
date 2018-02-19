package code.tests;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.app.service.DataTablesServiceImpl;

public class DateTest {
	public static void main(String[] args) {
		//System.out.println(new DateValidator().validate("02-29-2017", null));
		DateFormat fmt = new SimpleDateFormat("HH:mm:ss a");
		String hr = "25:30:59 PM";
		boolean valid = hr.matches("^\\d{2}:\\d{2}:\\d{2}\\s(AM|am|PM|pm)");	
		System.out.println(valid);
		String[] news = hr.split("[: ]");
		System.out.println(new DataTablesServiceImpl().isEmpty(null));
		for (String s : news) {
			System.out.println(s);
		}
		System.out.println(Integer.parseInt("01"));
		try {
			Date date = fmt.parse("25:30:59 am");
			System.out.println(date);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		
		List<Object> objects = new ArrayList<>();
		List<String> strings = new ArrayList<>();
		
		//new Test111().test1(strings); // NO!
	}
	
	public void test1(List<Object> objects) {
		System.out.println("pass");
	}
}
