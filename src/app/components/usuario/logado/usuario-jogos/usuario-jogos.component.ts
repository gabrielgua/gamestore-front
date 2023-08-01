import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { JogoResumo } from 'src/app/models/jogos/jogo.resumo';
import { JogosUsuarioLogadoService } from 'src/app/service/jogos/jogos-usuario-logado.service';

@Component({
  selector: 'app-usuario-jogos',
  templateUrl: './usuario-jogos.component.html',
  styleUrls: ['./usuario-jogos.component.css']
})
export class UsuarioJogosComponent implements OnInit {

  jogos$ = new Observable<JogoResumo[]>();
  showKey: boolean = false;
  
  constructor(private service: JogosUsuarioLogadoService) {}

  ngOnInit(): void {
    this.service.fetchJogos();
    this.jogos$ = this.service.getJogos();
  }
}
