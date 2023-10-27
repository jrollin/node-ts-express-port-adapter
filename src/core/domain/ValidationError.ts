import { Validator } from 'validatorjs';

export class ValidationError extends Error {
    constructor(private errors: Validator.Errors) {
        super('validation failed');
        this.name = 'ValidationError';
    }

    getErrors(): Validator.ValidationErrors {
        return this.errors.all();
    }
}
