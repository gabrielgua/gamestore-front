import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JogoResumo } from 'src/app/models/jogos/jogo.resumo';
import { CarrinhoService } from 'src/app/service/carrinho/carrinho.service';
import { DesejosService } from 'src/app/service/usuario-logado/desejos/desejos.service';

@Component({
  selector: 'app-desejos',
  templateUrl: './desejos.component.html',
  styleUrls: ['./desejos.component.css']
})
export class DesejosComponent implements OnInit {


  desejos$ = new Observable<JogoResumo[]>;

  constructor(
    private desejosService: DesejosService, 
    private carrinhoService: CarrinhoService,
    private router: Router) {}

  ngOnInit(): void {
    this.desejosService.fetchDesejos();
    this.desejos$ = this.desejosService.getDesejos();
  }

  handleComprar(jogo: JogoResumo): void {
    this.router.navigate(['carrinho'])
      .then(() => {
        this.carrinhoService.addJogo(jogo);
      });
  }

  handleRemover(jogoId: number): void {
    this.desejosService.remover(jogoId);
  }
}
