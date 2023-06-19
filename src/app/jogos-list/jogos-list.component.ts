import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { JogosListService } from '../service/jogos/jogos-list.service';
import { FadeFromBottom } from '../animations/animations';
import { Jogo } from '../models/jogo';
import { PageableModel } from '../models/pageable.model';
import { JogoPageableRequest } from '../models/jogo.pageable';


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
  loading: boolean = false;

  search: string = '';

  pageable: JogoPageableRequest = {
    page: 0,
    size: 10,
    sort: '',
  }

  ngOnInit(): void {
    this.jogos = [];
    this.pageableJogos = new PageableModel();
    this.service.init(this.pageable);
    this.fetchJogos();
  }

  fetchJogos(): void {
    this.service.getPageableJogos().subscribe((pageableJogos) => {
      this.pageableJogos = pageableJogos;
      this.jogos = pageableJogos.content;
      this.loading = false;
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

  getTotalPages(): number {
    return this.pageableJogos.pageInfo?.pages;
  }

  getCurrentPage(): number {
    return this.pageableJogos.pageInfo?.page;
  }

  goToPage(index: number) {
    this.pageable.page = index;
    this.service.init(this.pageable);
    this.loading = true;

  }

  nextPage(): void {
    this.pageable.page = this.hasNextPage() ? this.pageableJogos.pageInfo.page + 1 : this.pageable.page;
    this.service.init(this.pageable);
    this.loading = true;

  } 

  prevPage(): void {
    this.pageable.page = this.hasPrevPage() ? this.pageableJogos.pageInfo.page - 1 : this.pageable.page;
    this.service.init(this.pageable);
    this.loading = true;

  }


  hasNextPage(): boolean {
    return this.pageableJogos.pageInfo?.next != null;
  }

  hasPrevPage(): boolean {
    return this.pageableJogos.pageInfo?.prev != null;
  }
}
