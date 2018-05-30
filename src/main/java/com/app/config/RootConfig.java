package com.app.config;

import javax.sql.DataSource;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.SimpleDriverDataSource;

import oracle.jdbc.driver.OracleDriver;

@Configuration
public class RootConfig {

	@Bean
	public DataSource dataSource() {
		SimpleDriverDataSource dataSource = new SimpleDriverDataSource();

		dataSource.setDriverClass(OracleDriver.class);
		//dataSource.setUrl("jdbc:oracle:thin:@localhost:1521:BASEDANIEL");
		dataSource.setUrl("jdbc:oracle:thin:@192.10.10.107:1521:UCPBGEN");
		dataSource.setUsername("CPI");
		//dataSource.setPassword("CPI12345!!");
		dataSource.setPassword("CPI12345!");

		return dataSource;
	}


}
