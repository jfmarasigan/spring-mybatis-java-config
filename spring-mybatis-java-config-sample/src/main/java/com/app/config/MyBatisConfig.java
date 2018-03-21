package com.app.config;

import javax.sql.DataSource;

import org.apache.ibatis.session.AutoMappingBehavior;
import org.apache.ibatis.type.JdbcType;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.jdbc.datasource.SimpleDriverDataSource;

import oracle.jdbc.driver.OracleDriver;

@Configuration
@MapperScan(basePackages = {"com.app.mappers"})
public class MyBatisConfig {

	@Bean
	public DataSource dataSource() {
		SimpleDriverDataSource dataSource = new SimpleDriverDataSource();
		
		dataSource.setDriverClass(OracleDriver.class);
		dataSource.setUrl("jdbc:oracle:thin:@localhost:1521:BASEDANIEL");
		dataSource.setUsername("CPI");
		dataSource.setPassword("CPI12345!!");
		
		return dataSource;
	}
	
	@Bean
	public DataSourceTransactionManager transactionManager() {
		return new DataSourceTransactionManager(dataSource());
	}

	@Bean
	public org.apache.ibatis.session.Configuration mybatisConfig(){
		org.apache.ibatis.session.Configuration config = new org.apache.ibatis.session.Configuration();
		
		config.setMapUnderscoreToCamelCase(true);
		config.setAutoMappingBehavior(AutoMappingBehavior.PARTIAL);
		config.setJdbcTypeForNull(JdbcType.NULL);
		config.getTypeAliasRegistry().registerAliases("com.app.entity");
		
		return config;		
	}
	
	
	@Bean
	public SqlSessionFactoryBean sqlSessionFactory() {
		SqlSessionFactoryBean sessionFactory = new SqlSessionFactoryBean();
		sessionFactory.setDataSource(dataSource());
		sessionFactory.setConfiguration(mybatisConfig());
		//sessionFactory.setTypeAliasesPackage("com.app.entity");
		return sessionFactory;
	}
	
}
