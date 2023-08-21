import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from "@angular/forms";
import { Observable, delay, distinctUntilChanged, filter, map, of, switchMap } from "rxjs";
import { AuthService } from "src/app/service/auth/auth.service";

export default class Validation {

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

    static compareToValue(controlName: string, valueToCompare: string): ValidatorFn {
        return (abstractControl: AbstractControl) => {
            const control = abstractControl.get(controlName);

            if (control?.value.toLowerCase() === valueToCompare) {
                control.setErrors({ sameValue: true })
                return { sameValue: true }
            }

            return null;
        }
    }


    //usernameTaken
    static usernameTaken(service: AuthService): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            const username = control.value.toLowerCase();

            return of(username).pipe(
                delay(500),
                distinctUntilChanged(),
                switchMap((username) => service.checkUsername(username).pipe(
                    map( result => result ? {taken: true} : null )
                ))
            );
        }
    }

    static emailTaken(service: AuthService): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            const email = control.value.toLowerCase();

            return of(email).pipe(
                delay(500),
                distinctUntilChanged(),
                switchMap((email) => service.checkEmail(email).pipe(
                    map( result => result ? {taken: true} : null )
                ))
            );
        }
    }


}