export interface IValidationRulesBuilder {
  messages: string[];
  isValid: boolean;
}

export class ValidationRulesBuilder {
  private messages: string[] = [];

  constructor(private readonly value: any) {
    if (this.value === undefined || this.value === null) {
      throw new Error("Value cannot be undefined or null.");
    }
  }

  public required(message: string): ValidationRulesBuilder {
    if (this.value.trim().length === 0) {
      this.messages.push(message);
    }

    return this;
  }

  public isNumber(message: string): ValidationRulesBuilder {
    if (isNaN(this.value) || parseInt(this.value) <= 0) {
      this.messages.push(message);
    }

    return this;
  
  }

  public isEmail(message: string): ValidationRulesBuilder {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(this.value)) {
      this.messages.push(message);
    }

    return this;
  }

  public build(): IValidationRulesBuilder {
    return {
      messages: this.messages,
      isValid: this.messages.length === 0
    };
  }
}