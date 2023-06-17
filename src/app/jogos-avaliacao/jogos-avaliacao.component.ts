import { Component, OnInit } from '@angular/core';
import { JogosAvaliacaoService } from '../service/jogos-avaliacao.service';
import { Jogo } from '../models/jogo';
import { PageableModel } from '../models/pageable.model';
import { PageInfo } from '../models/page.info';
import { Fade } from '../animations/animations';

@Component({
  selector: 'app-jogos-avaliacao',
  templateUrl: './jogos-avaliacao.component.html',
  styleUrls: ['./jogos-avaliacao.component.css'],
  animations: [
    Fade
  ]
})
export class JogosAvaliacaoComponent implements OnInit {

  jogos: Jogo[] = [];
  pageableJogos: PageableModel<Jogo> = new PageableModel();
  search: any;


  loading: boolean = false;

  constructor(private service: JogosAvaliacaoService) {}

  private pageable = {
    size: 5,
    page: 0,
    sort: 'nota,desc',
  }

  ngOnInit(): void {
    this.jogos = [];
    this.service.init(this.pageable);
    this.loading = true;
    this.getJogos();
  }

  getJogos(): void {
    this.service.jogosPageable$.subscribe((pageableJogo: PageableModel<Jogo>) => {
      if (pageableJogo.content.length) {
        this.pageableJogos = pageableJogo;
        
        this.pupulateJogos(pageableJogo, this.jogos.length === 0);

        console.log(this.jogos);
        this.loading = false;
      } 
    });
  }

  nextPage(): void {
    if (this.pageableJogos.pageInfo.next != null) {
      this.pageable.page = this.pageable.page + 1;
      this.service.init(this.pageable);
      this.loading = true;

    }
  }

  pupulateJogos(pageableJogo: PageableModel<Jogo>, firstLoad: boolean): void {
    pageableJogo.content.forEach((jogo, index) => {

      if (firstLoad) {
        this.jogos.push(jogo);
      } else {
        setTimeout(() => {
          this.jogos.push(jogo);
        }, 80 * (index + 1));
      }
    });
  }

  isLastPage(): boolean {
    return this.pageableJogos.pageInfo.next === null;
  }
}
