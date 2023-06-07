import { Component, OnInit } from '@angular/core';
import { JogoService } from '../service/jogo.service';
import { Jogo } from '../models/jogo';
import { ActivatedRoute } from '@angular/router';
import { Requisito } from '../models/requisito';
import { TipoRequisito } from '../models/tipoRequisito';
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

  ngOnInit(): void {
    let uriNome = this.route.snapshot.paramMap.get('uriNome')!;
    this.getJogo(uriNome);
  }

  getJogo(uriNome: string): void {
    this.service.getJogoByUri(uriNome).subscribe((jogo) => this.jogo = jogo);
  }



}
