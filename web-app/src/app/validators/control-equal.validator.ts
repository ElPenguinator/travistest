import {AbstractControl} from '@angular/forms';

/**
 * Form validator which check if value of other field is equal to the current.
 * @param {AbstractControl} otherControl
 * @return {(control: AbstractControl) => {controlEqual: string}}
 */
export function ControlEqualValidator(otherControl: AbstractControl) {
    return (control: AbstractControl) => {
        return (control.value !== otherControl.value) ?
            { controlEqual: true } :
            null;
    };
}
