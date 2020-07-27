export interface StringValidatorInterface {
    validator: (val: string) => boolean;
    message: string;
}

// Change the 'any' type to the best for the validator
export type StringValidatorType = StringValidatorInterface;

export interface StringValidatorOptionsInterface {
    min?: number;
    max?: number;
    match?: RegExp;
    info?: string;
}

function stringValidator(options: StringValidatorOptionsInterface): StringValidatorType {
    const { min = 3, max = 128, match = /^(.*)$/i, info = '' } = options;
    const getErrorInfo = (errorInfo: string): string => info ? errorInfo.concat('. (', info, ')') : errorInfo;

    return ({
        validator: (val: string): boolean => {
            const testVal = val.trim();
            const testLength = testVal.length;
            return (match.test(testVal) && testLength >= min && testLength <= max);
        },
        message: getErrorInfo(`Value of '{PATH}' must be between ${min} and ${max} characters long`)
    });
}

export default stringValidator;
