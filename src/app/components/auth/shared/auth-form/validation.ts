import { AbstractControl, ValidatorFn } from "@angular/forms";
import { AuthService } from "src/app/service/auth/auth.service";

export default class Validation {
    constructor(private auth: AuthService) {}

    static match(controlName: string, checkControleName: string): ValidatorFn {
        return (controls: AbstractControl) => {
            const control = controls.get(controlName);
            const checkControl = controls.get(checkControleName);

            if (checkControl?.errors && !checkControl?.errors['matching']) {
                return null;
            }

            if (control?.value !== checkControl?.value) {
                controls.get(checkControleName)?.setErrors({ matching: true });
                return { matching: true }
            } 

            return null;
        }
    }


    static taken(controlName: string): ValidatorFn {
        return (controls: AbstractControl) => {
            const control = controls.get(controlName);

            if (control?.errors && !control?.errors['taken']) {
                return null;
            }

            //todo check if control is already taken from api;

            return null;
        }
    }
}