package com.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.app.entity.GIACChartOfAccts;
import com.app.entity.GIACS311DTParams;
import com.app.mappers.GIACS311Mapper;

@Service
@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
public class GIACS311Service {
	
	private GIACS311Mapper mapper;

	@Autowired
	public GIACS311Service(GIACS311Mapper mapper) {
		this.mapper = mapper;
	}
	
	public List<GIACChartOfAccts> getGIACS311(GIACS311DTParams params) {
		return mapper.getGIACS311TG(params);
	}

	public Integer getTotalRecords(List<GIACChartOfAccts> gcoa) {
		return !gcoa.isEmpty() ? gcoa.get(0).getTotalRecords() : 0;
	}
	
	public void testSave() {
		mapper.testSave();
	}
}
