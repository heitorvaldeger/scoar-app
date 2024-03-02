import { useState } from "react";
import { IValidationRulesPlaceCreate } from "./interfaces";
import { Place } from "@/interfaces/Entities/Place";
import { ValidationRulesBuilder } from "@/utils/ValidationRulesBuilder";

const initialValidation: IValidationRulesPlaceCreate = {
  code: {
    messages: [],
    isValid: true
  },
  name: {
    messages: [],
    isValid: true
  }
};

export const useValidatePlaceCreate = () => {
  const [errors, setErrors] = useState<IValidationRulesPlaceCreate>(initialValidation);

  const makeValidation = (place: Place) => ({
    code: new ValidationRulesBuilder(place.code)
      .required('Código é obrigatório!')
      .build(),
    name: new ValidationRulesBuilder(place.name)
      .required('Nome é obrigatório!')
      .build()
  })

  const validateForm = (fields: any) => {
    const validation = makeValidation(fields);
    setErrors(validation);
    return Object.values(validation).every(item => item.isValid);
  }

  const resetFormValidation = () => {
    setErrors(initialValidation);
  }

  return {
    errors,
    validateForm,
    resetFormValidation
  }
}