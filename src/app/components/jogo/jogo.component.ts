import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Jogo } from '../../models/jogos/jogo';
import { ActivatedRoute, Router } from '@angular/router';
import { JogoBuscarService } from '../../service/jogos/jogo-buscar.service';
import { TipoRequisito } from '../../models/requisitos/tipoRequisito';
import { Requisito } from '../../models/requisitos/requisito';
import { JogoResumo } from 'src/app/models/jogos/jogo.resumo';
import { CarrinhoService } from 'src/app/service/carrinho/carrinho.service';

@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html',
  styleUrls: ['./jogo.component.css']
})
export class JogoComponent implements OnInit, AfterViewInit {

  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private carrinhoService: CarrinhoService,
    private service: JogoBuscarService,
    private changeDetector: ChangeDetectorRef
  ) {}
  
  @ViewChild('container') container!: ElementRef;

  loading: any;
  jogo = new Jogo();
  mobile: boolean = false;
  notaPositive: number = 7;
  breakToMobileWidth: number = 765; //px 

  ngOnInit(): void {
    let uriNome = this.route.snapshot.paramMap.get('uriNome')!;
    this.getJogo(uriNome);
  }

  ngAfterViewInit(): void {
    this.manageScreenSize(this.container.nativeElement.offsetWidth);
    this.changeDetector.detectChanges();
  }

  manageScreenSize(screenWidth: number) {
    this.mobile = screenWidth <= this.breakToMobileWidth;        
  }

  getJogo(uriNome: string): void {
    this.service.fetchJogoData(uriNome);
    this.service.getJogo().subscribe({
      next: jogo => this.handleSuccess(jogo),
    });
  }

  private handleSuccess(jogo: Jogo) {
    this.jogo = jogo;
    this.arangeRequisitos(this.jogo);  
  }

  getRequisitoNome(requisito: Requisito): string {
    return requisito?.tipo === 'MINIMOS' ? 'Mínimos' : 'Recomendados'
  }

  getUrlVideo(url: string): string {
    return url ? url : '';
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

  arangeRequisitos(jogo: Jogo): void {
    if (jogo.requisitos) {
      let first = jogo.requisitos[0];
     
      if (first && first.tipo != TipoRequisito.MINIMOS) {
        jogo.requisitos.push(jogo.requisitos.shift()!);
      }
    }
  }

  addToCart(jogo: Jogo): void {
    const jogoResumo = new JogoResumo();
    jogoResumo.descricao = jogo.descricao;
    jogoResumo.id = jogo.id;
    jogoResumo.desenvolvedora = jogo.desenvolvedora;
    jogoResumo.nome = jogo.nome;
    jogoResumo.uriNome = jogo.uriNome;
    jogoResumo.nota = jogo.nota;
    jogoResumo.urlImagem = jogo.urlImagem;
    jogoResumo.urlVideo = jogo.urlVideo;

    this.router.navigate(['carrinho'])
      .then(() => {
        this.carrinhoService.addJogo(jogoResumo);
      });
  }
}
