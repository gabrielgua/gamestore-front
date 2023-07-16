import { Pipe, PipeTransform } from '@angular/core';
import { catchError, isObservable, map, of, startWith } from 'rxjs';

@Pipe({
  name: 'loading'
})
export class LoadingPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return isObservable(value) 
      ? value.pipe(
        map(value => ({ loading: false, value })),
        startWith({ loading: true }),
        catchError(error => of({ loading: false, error }))
      )
      : value;
  }

}
