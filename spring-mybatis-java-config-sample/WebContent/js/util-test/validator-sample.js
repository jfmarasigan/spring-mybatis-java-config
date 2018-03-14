function validateField(keyword1, keyword2, filterType, successHandler, errorHandler) {
	jQuery.ajax({
		method: 'GET',
		url : 'validate',
		data : {
			keyword : keyword1,
			optKeyword : keyword2,
			filterType : filterType
		},
		success : function (data, textStatus, jqXHR){
			successHandler(data, jqXHR);
		}, 
		error : function (jqXHR, textStatus, errorThrown){
			errorHandler(jqXHR);
		}
	});
}