import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Jogo } from '../../models/jogo';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class JogoBuscarService {

  public jogo$ = new BehaviorSubject<Jogo>(new Jogo());

  constructor(private http: HttpClient, private router: Router) { }

  public fetchJogoData(uriNome: string): void {
    this.http.get<Jogo>(`${environment.API_URL}/jogos?uriNome=${uriNome}`)
    .subscribe({
      next: jogo => this.jogo$.next(jogo),
      error: err => this.handleNotFound(err)
    });
  }

  private handleNotFound(err: HttpErrorResponse): void {
    if (err.status === 404) {
      this.router.navigate(['error/not-found']);      
    }    
  }
  
  public getJogo(): Observable<Jogo> {
    return this.jogo$.asObservable();
  }
}
