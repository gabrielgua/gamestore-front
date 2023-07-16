import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Categoria } from 'src/app/models/categorias/categoria';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriasListService {

  constructor(private http: HttpClient) { 
    this.init();
  }

  categorias$ = new BehaviorSubject<Categoria[]>([]);

  private init(): void {
    this.http.get<Categoria[]>(`${environment.API_URL}/categorias`)
      .subscribe((categorias) => this.categorias$.next(categorias));
  }

public getCategorias(): Observable<Categoria[]> {
    return this.categorias$.asObservable();
  }
}
