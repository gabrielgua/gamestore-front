import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Modo } from 'src/app/models/modo';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModosListService {

  constructor(private http: HttpClient) {

    this.init();
  }

  private modos$ = new BehaviorSubject<Modo[]>([]);

  private init(): void {
    this.http.get<Modo[]>(`${environment.API_URL}/modos`)
      .subscribe((modos) => this.modos$.next(modos));
  }

  public getModo(): Observable<Modo[]> {
    return this.modos$.asObservable();
  }

}
