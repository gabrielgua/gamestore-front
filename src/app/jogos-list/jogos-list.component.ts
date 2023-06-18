import { Component, OnInit } from '@angular/core';
import { JogosListService } from '../service/jogos-list.service.service';
import { FadeInOut } from '../animations/animations';
import { Jogo } from '../models/jogo';
import { PageableModel } from '../models/pageable.model';
import { JogoPageableRequest } from '../models/jogo.pageable';

@Component({
  selector: 'app-jogos-list',
  templateUrl: './jogos-list.component.html',
  styleUrls: ['./jogos-list.component.css'],
  animations: [ FadeInOut ]
})
export class JogosListComponent implements OnInit {

  constructor(private service: JogosListService) {}
  
  jogos: Jogo[] = [];
  pageableJogos: PageableModel<Jogo> = new PageableModel();

  search: string = '';

  showDropCategorias: boolean = false;
  showDropPlataformas: boolean = false;
  showDropPreco: boolean = true;

  pageable: JogoPageableRequest = {
    page: 0,
    size: 5,
    sort: '',
  }

  ngOnInit(): void {
    this.service.init(this.pageable);
    this.fetchJogos();
  }

  fetchJogos(): void {
    this.service.pageableJogos$.subscribe((pageableJogos) => {
      if (pageableJogos.content.length) {
        this.pageableJogos = pageableJogos;
        pageableJogos.content.forEach((jogo) => {
          this.jogos.push(jogo);
        })
      }
    })
  }

  
}
