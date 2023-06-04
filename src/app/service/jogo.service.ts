import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, firstValueFrom } from 'rxjs';
import { Jogo } from '../models/jogo';
import { environment } from 'src/environments/environment';
import { JogoPageable } from '../models/jogo.pageable';

@Injectable({
  providedIn: 'root'
})
export class JogoService {


  constructor(private http: HttpClient) {}

 

  listarJogos(pageable?: JogoPageable): Promise<any>{
    console.log(pageable);
    

    return firstValueFrom(this.http.get<any>(`${environment.API_URL}/jogos?page=${pageable?.page}&size=${pageable?.size}&${pageable?.sort}`));
  }

  buscarJogoPorId(jogoId: number): Promise<Jogo> {
    return firstValueFrom(this.http.get<Jogo>(`${environment.API_URL}/jogos/${jogoId}`));
  }

  buscarJogoPorUriNome(uriNome: string): Promise<Jogo> {
    return firstValueFrom(this.http.get<Jogo>(`${environment.API_URL}/jogos?nome=${uriNome}`));
  }
}
