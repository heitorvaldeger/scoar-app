export interface IValidationRulesPlaceCreate {
  code: {
    messages: string[];
    isValid: boolean;
  },
  name: {
    messages: string[];
    isValid: boolean;
  }
}