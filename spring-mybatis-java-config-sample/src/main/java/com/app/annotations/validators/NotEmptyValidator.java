package com.app.annotations.validators;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import javax.validation.constraints.NotEmpty;

public class NotEmptyValidator implements ConstraintValidator<NotEmpty, String>{

	@Override
	public boolean isValid(String value, ConstraintValidatorContext context) {
		return value != null || !"".equals(value);
	}

}
