package com.app.mappers;

import java.util.List;

import com.app.entity.GIACChartOfAccts;
import com.app.entity.GIACS311DTParams;

public interface GIACS311Mapper {
	
	List<GIACChartOfAccts> getGIACS311TG(GIACS311DTParams params);
	void testSave();
}
