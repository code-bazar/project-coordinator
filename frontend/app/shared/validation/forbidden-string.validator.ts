import { ValidatorFn, AbstractControl } from '@angular/forms';

export function forbiddenStringValidator(strReg: RegExp): ValidatorFn {              //RegExp - Regular Expression - this is like a pattern of a string. Do it contains specific characters or numbers
    return (control: AbstractControl): { [key: string]: any } => {                   //'{ [ key: string ]: any }' this is our return type - JavaScript object, key is type of string and value can be any
        const str = control.value;
        const invalid = strReg.test(str);       //Does the parameter that we are passing in - str - match the pattern of regular expression - strReg
        return invalid ? { 'forbiddenString': { str } } : null;
    }
}