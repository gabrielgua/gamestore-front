import { Component, OnInit } from '@angular/core';
import { JogoService } from '../service/jogo.service';
import { Jogo } from '../models/jogo';
import { ActivatedRoute } from '@angular/router';
import { Requisito } from '../models/requisito';
import { TipoRequisito } from '../models/tipoRequisito';

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
  requisitosPc: Requisito[] = [];
  requisitosConsole: Requisito[] = [];

  ngOnInit(): void {
    let uriNome = this.route.snapshot.paramMap.get('uriNome')!;
    this.buscarJogo(uriNome);
  }

  buscarJogo(uriNome: string): void {
    this.jogoService.buscarJogoPorUriNome(uriNome)
      .then((jogo: Jogo) => {
        this.jogo = jogo;
        this.ordenarRequisitos(jogo.requisitos);
      }).catch((error: any) => {
        console.log(error.error);
      })
  }

  ordenarRequisitos(requisitos: Requisito[]) {
    requisitos.forEach(requisito => {
      if (requisito.tipo === TipoRequisito.CONSOLES) {
        this.requisitosConsole.push(requisito);
      } else {
        this.requisitosPc.push(requisito);
      }
    })
    
    this.requisitosPc.unshift(this.requisitosPc.splice(this.requisitosPc.findIndex(requisito => requisito.tipo === TipoRequisito.MINIMOS), 1)[0]);

  }
}
