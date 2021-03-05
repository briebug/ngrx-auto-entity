import { AbstractControl, ValidatorFn } from '@angular/forms';

export type FormGroupConfig<T> = {
  [P in keyof T]: T[P] | [T[P], ValidatorFn] | [T[P]] | AbstractControl;
};
