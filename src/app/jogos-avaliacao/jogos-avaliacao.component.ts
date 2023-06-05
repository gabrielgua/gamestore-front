import { Component, OnInit } from '@angular/core';
import { JogosAvaliacaoService } from '../service/jogos-avaliacao.service';
import { Jogo } from '../models/jogo';

@Component({
  selector: 'app-jogos-avaliacao',
  templateUrl: './jogos-avaliacao.component.html',
  styleUrls: ['./jogos-avaliacao.component.css']
})
export class JogosAvaliacaoComponent implements OnInit {

  jogos: Jogo[] = [];

  constructor(private service: JogosAvaliacaoService) {}

  ngOnInit(): void {
    this.getJogos();
  }

  getJogos(): void {
    this.service.jogos$.subscribe((jogos) => this.jogos = jogos);
  }

}
