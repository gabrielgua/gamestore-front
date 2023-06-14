import { Component, OnInit } from '@angular/core';
import { Jogo } from '../models/jogo';
import { ActivatedRoute } from '@angular/router';
import { JogoBuscarService } from '../service/jogo-buscar.service';
import { TipoRequisito } from '../models/tipoRequisito';
import { Observable, share } from 'rxjs';

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

  jogoAsync: Observable<Jogo> | undefined;
  loading: any;

  ngOnInit(): void {
    let uriNome = this.route.snapshot.paramMap.get('uriNome')!;
    this.getJogo(uriNome);

    // this.jogoAsync = this.service.getJogoByUri(uriNome).pipe(share());
  }

  getJogo(uriNome: string): void {
    this.service.getJogoByUri(uriNome).subscribe((jogo) => {
      this.jogo = jogo;
      this.arangeRequisitos();
    });
  }

  isFilled(index: number, nota: number): boolean {
    return index <= nota;
  }

  maiorQueMetade(nota: number): boolean {
    return nota % 1 >= .5;
  }

  roundNota(nota: number): number {
    return Math.round(nota);
  }

  getStarIcon(index: number, nota: number): string {
    return index === this.roundNota(nota) && this.maiorQueMetade(nota) ? 'star_half': 'star';
  }

  arangeRequisitos(): void {
    if (this.jogo.requisitos && this.jogo.requisitos[0].tipo != TipoRequisito.MINIMOS) {
      this.jogo.requisitos.push(this.jogo.requisitos.shift()!);
    }
  }



}
