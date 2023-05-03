import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  listarJogos(): Promise<any>{
    return firstValueFrom(this.http.get<any>('http://localhost:8080/jogos'));
  }
}
