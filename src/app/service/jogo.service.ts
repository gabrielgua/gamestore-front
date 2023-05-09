import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Jogo } from '../models/jogo';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JogoService {

  constructor(private http: HttpClient) { }

  listarJogos(): Promise<any>{
    return firstValueFrom(this.http.get<any>(`${environment.API_URL}/jogos`));
  }

  buscarJogoPorId(jogoId: number): Promise<Jogo> {
    return firstValueFrom(this.http.get<Jogo>(`${environment.API_URL}/jogos/${jogoId}`));
  }

  buscarJogoPorUriNome(uriNome: string): Promise<Jogo> {
    return firstValueFrom(this.http.get<Jogo>(`${environment.API_URL}/jogos?nome=${uriNome}`));
  }
}
