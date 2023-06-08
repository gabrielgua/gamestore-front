import { Component, OnInit } from '@angular/core';
import { Jogo } from '../models/jogo';
import { ActivatedRoute } from '@angular/router';
import { JogoBuscarService } from '../service/jogo-buscar.service';

@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html',
  styleUrls: ['./jogo.component.css']
})
export class JogoComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private service: JogoBuscarService) {}

  jogo = new Jogo();
  notaPositive: number = 7;

  ngOnInit(): void {
    let uriNome = this.route.snapshot.paramMap.get('uriNome')!;
    this.getJogo(uriNome);
  }

  getJogo(uriNome: string): void {
    this.service.getJogoByUri(uriNome).subscribe((jogo) => this.jogo = jogo);
  }

  maiorQueMetade(nota: number): boolean {
    return nota % 1 >= .5;
  }

  roundNota(nota: number): number {
    return Math.round(nota);
  }



}
