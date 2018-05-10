package com.app.config;

import javax.sql.DataSource;

import org.apache.ibatis.session.AutoMappingBehavior;
import org.apache.ibatis.type.JdbcType;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@MapperScan(basePackages = { "com.app.mappers" })
public class MyBatisConfig {

	@Autowired
	private DataSource dataSource;
	
	@Bean
	public org.apache.ibatis.session.Configuration mybatisConfig() {
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
		sessionFactory.setDataSource(dataSource);
		sessionFactory.setConfiguration(mybatisConfig());
		return sessionFactory;
	}

}
