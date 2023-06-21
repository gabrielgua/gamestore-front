import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { JogosListService } from '../service/jogos/jogos-list.service';
import { FadeFromBottom } from '../animations/animations';
import { Jogo } from '../models/jogo';
import { PageableModel } from '../models/pageable.model';
import { JogoPageableRequest } from '../models/jogo.pageable';
import { JogoFilter } from '../models/jogo.filter';
import { FormControl } from '@angular/forms';


export interface ActiveFilter {
  id?: number,
  tipo?: FilterTipo,
  nome?: string,
}

export enum FilterTipo {
  CATEGORIA, PLATAFORMA, MODO, PRECO, AVALIACAO, BUSCA
}

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

  search = new FormControl('');

  pageable: JogoPageableRequest = {
    page: 0,
    size: 10,
    sort: '',
  }

  filter: JogoFilter = {
    nome: '',
    modosIds: [],
    categoriasIds: [],
    plataformasIds: []
  }

  activeFilters: ActiveFilter[] = [
    {tipo: FilterTipo.BUSCA, nome: '"dark souls"'},
  ];




  ngOnInit(): void {
    this.jogos = [];
    this.pageableJogos = new PageableModel();
    this.service.init(this.pageable, this.filter);
    this.fetchJogos();
  }

  fetchJogos(): void {
    this.service.getPageableJogos().subscribe((pageableJogos) => {
      this.pageableJogos = pageableJogos;
      this.jogos = pageableJogos.content;
      this.loading = false;
    })
  }

  handleSearch() {
    let indexFiltro = this.activeFilters.findIndex(aFilter => aFilter.tipo === FilterTipo.BUSCA);
    if (!this.search.value) {
      this.removeFilter(indexFiltro);
    }

    let busca = '"' + this.search.value  + '"';

    indexFiltro != -1
      ? this.activeFilters[indexFiltro].nome = busca
      : this.activeFilters.push({tipo: FilterTipo.BUSCA, nome: busca});
    
    this.filter.nome = this.search.value!;
    this.service.init(this.pageable, this.filter);
  }

  removeFilter(index: number) {
    let filtro = this.activeFilters[index];
    this.activeFilters.splice(index, 1);

    switch(filtro.tipo) {
      case FilterTipo.BUSCA: {
        this.filter.nome = '';
        this.search.reset();
        break;
      }
    }

    this.service.init(this.pageable, this.filter);
  }

  handleOutsideClick(event: any) {
    if (event.target.offsetParent?.id != 'filter' && event.target.id != 'filter__option') {      
      this.closeFilters = !this.closeFilters;
    }
  }

  clearJogos(): void {
    this.jogos = [];
  }

  getTotalElements(): number {
    return this.pageableJogos.pageInfo?.count;
  }

  getTotalPages(): number {
    return this.pageableJogos.pageInfo?.pages;
  }

  getCurrentPage(): number {
    return this.pageableJogos.pageInfo?.page;
  }

  goToPage(index: number) {
    this.pageable.page = index;
    this.service.init(this.pageable, this.filter);
    this.loading = true;

  }

  nextPage(): void {
    this.pageable.page = this.hasNextPage() ? this.pageableJogos.pageInfo.page + 1 : this.pageable.page;
    this.service.init(this.pageable, this.filter);
    this.loading = true;

  } 

  prevPage(): void {
    this.pageable.page = this.hasPrevPage() ? this.pageableJogos.pageInfo.page - 1 : this.pageable.page;
    this.service.init(this.pageable, this.filter);
    this.loading = true;

  }


  hasNextPage(): boolean {
    return this.pageableJogos.pageInfo?.next != null;
  }

  hasPrevPage(): boolean {
    return this.pageableJogos.pageInfo?.prev != null;
  }

}
