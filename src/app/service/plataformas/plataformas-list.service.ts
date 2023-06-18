import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Plataforma } from 'src/app/models/plataforma';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlataformasListService {

  constructor(private http: HttpClient) { 
    this.init();
  }

  plataformas$ = new BehaviorSubject<Plataforma[]>([]);

  private init(): void {
    this.http.get<Plataforma[]>(`${environment.API_URL}/plataformas`)
      .subscribe((plataformas) => this.plataformas$.next(plataformas));
  }

  public getPlataformas(): Observable<Plataforma[]> {
    return this.plataformas$.asObservable();
  }
}
