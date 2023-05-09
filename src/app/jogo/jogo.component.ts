import { Component, OnInit } from '@angular/core';
import { JogoService } from '../service/jogo.service';
import { Jogo } from '../models/jogo';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html',
  styleUrls: ['./jogo.component.css']
})
export class JogoComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private jogoService: JogoService) {}

  jogo = new Jogo();

  ngOnInit(): void {
    let uriNome = this.route.snapshot.paramMap.get('uriNome')!;
    this.buscarJogo(uriNome);
  }

  buscarJogo(uriNome: string): void {
    this.jogoService.buscarJogoPorUriNome(uriNome)
      .then((jogo: Jogo) => {
        this.jogo = jogo;
      }).catch((error: any) => {
        console.log(error.error);
      })
  }
}
