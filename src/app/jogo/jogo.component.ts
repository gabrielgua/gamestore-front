import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Jogo } from '../models/jogo';
import { ActivatedRoute } from '@angular/router';
import { JogoBuscarService } from '../service/jogo-buscar.service';
import { TipoRequisito } from '../models/tipoRequisito';

@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html',
  styleUrls: ['./jogo.component.css']
})
export class JogoComponent implements OnInit, AfterViewInit {

  

  constructor(
    private route: ActivatedRoute,
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
    this.service.getJogo().subscribe((jogo) => {
      this.jogo = jogo;
      this.arangeRequisitos(this.jogo);
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

  arangeRequisitos(jogo: Jogo): void {

    if (jogo.requisitos && jogo.requisitos[0].tipo != TipoRequisito.MINIMOS) {
      jogo.requisitos.push(jogo.requisitos.shift()!);
    }
  }
}
