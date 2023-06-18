import { Component, OnDestroy, OnInit } from '@angular/core';
import { JogosListService } from '../service/jogos/jogos-list.service';
import { FadeFromBottom } from '../animations/animations';
import { Jogo } from '../models/jogo';
import { PageableModel } from '../models/pageable.model';
import { JogoPageableRequest } from '../models/jogo.pageable';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-jogos-list',
  templateUrl: './jogos-list.component.html',
  styleUrls: ['./jogos-list.component.css'],
  animations: [ FadeFromBottom ]
})
export class JogosListComponent implements OnInit {

  constructor(private service: JogosListService) {}
  
  
  jogos: Jogo[] = [];
  pageableJogos: PageableModel<Jogo> = new PageableModel();
  closeFilters: boolean = false;

  search: string = '';

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
      if (pageableJogos.content.length && !this.jogos.length) {
        this.pageableJogos = pageableJogos;
        pageableJogos.content.forEach((jogo, index) => {
          setTimeout(() => {
            this.jogos.push(jogo);
          }, 50 * index);
        })
      }
    })
  }

  handleOutsideClick(event: any) {
    
    if (event.target.offsetParent.id != 'filter' && event.target.id != 'filter__option') {      
      this.closeFilters = !this.closeFilters;
    }
  }

  clearJogos(): void {
    this.jogos = [];
  }
}
