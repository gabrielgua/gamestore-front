import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JogoResumo } from 'src/app/models/jogos/jogo.resumo';
import { PageInfo } from 'src/app/models/pageables/page.info';
import { CarrinhoService } from 'src/app/service/carrinho/carrinho.service';
import { ComprasUsuarioService } from 'src/app/service/jogos/jogos-usuario-logado.service';
import { DesejosService } from 'src/app/service/usuario-logado/desejos/desejos.service';
import { Animations } from '../../animations/animations';
import { Categoria } from '../../models/categorias/categoria';
import { JogoFilter } from '../../models/jogos/jogo.filter';
import { JogoPageableRequest } from '../../models/jogos/jogo.pageable';
import { Modo } from '../../models/modos/modo';
import { PageableModel } from '../../models/pageables/pageable.model';
import { Plataforma } from '../../models/plataformas/plataforma';
import { CategoriasListService } from '../../service/categorias/categorias-list.service';
import { JogosListService } from '../../service/jogos/jogos-list.service';
import { ModosListService } from '../../service/modos/modos-list.service';
import { PlataformasListService } from '../../service/plataformas/plataformas-list.service';

export interface FilterItem {
  tipo: FilterTipo,
  nome: string,
  show: boolean,
  options: FilterOption[]
}

export interface FilterOption {
  id: number,
  nome: string,
  tipo: FilterTipo
  value?: string,
}

export enum FilterTipo {
  CATEGORIA, PLATAFORMA, MODO, BUSCA
}

export interface SortFilter {
  nome: string,
  show: boolean,
  options: SortOption[]
}

export interface SortOption {
  nome: string;
  value: string;
}


@Component({
  selector: 'app-jogos-list',
  templateUrl: './jogos-list.component.html',
  styleUrls: ['./jogos-list.component.css'],
  animations: [ Animations ]
})
export class JogosListComponent implements OnInit, OnDestroy {


  constructor(
    private service: JogosListService,
    private categoriaService: CategoriasListService,
    private plataformaService: PlataformasListService,
    private jogosUsuarioService: ComprasUsuarioService,
    private modoService: ModosListService,
    private router: Router,
    private carrinhoService: CarrinhoService,
    private desejosService: DesejosService,
  ) {}
  
  
  PAGEABLE_DEFAULT_SIZE = 10;
  
  
  jogos: JogoResumo[] = [];
  pageableSub = new Subscription();

  modos: Modo[] = [];
  filterIds: string[] = ['filter', 'filter--sort', 'filter-title', 'filter-span-arrow'];
  categorias: Categoria[] = [];
  plataformas: Plataforma[] = [];

  pageableJogos: PageableModel<JogoResumo> = {content: [], pageInfo: {} as PageInfo};
  
  search = new FormControl('');

  pageable: JogoPageableRequest = {
    page: 0,
    size: this.PAGEABLE_DEFAULT_SIZE,
    sort: '',
  }

  filter: JogoFilter = {
    nome: '',
    modosIds: [],
    categoriasIds: [],
    plataformasIds: [],
    gratuito: false,
  }

  filters: FilterItem[] = [
    {tipo: FilterTipo.CATEGORIA, nome: 'Categorias',    show: false, options: []},
    {tipo: FilterTipo.PLATAFORMA, nome: 'Plataformas',   show: false, options: []},
    {tipo: FilterTipo.MODO, nome: 'Modos de jogo', show: false, options: []},
  ];

  
  sortOptions: SortOption[] = [
    {nome: 'Padrão', value: 'padrao'},
    {nome: 'Gratuitos', value: 'gratuito'},
    {nome: 'Preço crescente', value: 'preco,asc'},
    {nome: 'Preço decrescente', value: 'preco,desc'},
    {nome: 'Avaliações crescente', value: 'nota,asc'},
    {nome: 'Avaliações decrescente', value: 'nota,desc'},
  ]

  sortFilter: SortFilter = {
    nome: 'Ordenar por',
    show: false,
    options: this.sortOptions
  }

  filterTags: FilterOption[] = [];


  ngOnInit(): void {
    this.handleUrlParamSearch();
    this.init();
    this.pageableSub = this.service.getPageableJogos()
      .subscribe(pageable => {
        this.pageableJogos = pageable;
        this.jogos = pageable.content;
      });

    this.getModos();
    this.getCategorias();
    this.getPlataformas();

  }

  ngOnDestroy(): void {
    this.pageableSub.unsubscribe();
  }

  init(): void {
    this.service.init(this.pageable, this.filter);
  }

  

  getModos(): void {
    this.modoService.getModo().subscribe((modos) => {
      this.modos = modos;
      this.populateFilter(FilterTipo.MODO, this.modos);
    })
  }

  getCategorias(): void {
    this.categoriaService.getCategorias().subscribe((categorias) => {
      this.categorias = categorias;
      this.populateFilter(FilterTipo.CATEGORIA, this.categorias);
    });
  }

  getPlataformas(): void {
    this.plataformaService.getPlataformas().subscribe((plataformas) => {
      this.plataformas = plataformas;
      this.populateFilter(FilterTipo.PLATAFORMA, this.plataformas);
    });
  }

  private populateFilter(tipo: FilterTipo, options: any[]): void {
    this.filters.forEach((filter) => {
      if (filter.tipo === tipo) {
        filter.options = options;
        filter.options.forEach(option => option.tipo = filter.tipo)
      }
    })
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

  }

  nextPage(): void {
    this.pageable.page = this.hasNextPage() ? this.pageableJogos.pageInfo.page + 1 : this.pageable.page;
    this.service.init(this.pageable, this.filter);

  } 

  prevPage(): void {
    this.pageable.page = this.hasPrevPage() ? this.pageableJogos.pageInfo.page - 1 : this.pageable.page;
    this.service.init(this.pageable, this.filter);
  }


  hasNextPage(): boolean {
    return this.pageableJogos.pageInfo?.next != null;
  }

  hasPrevPage(): boolean {
    return this.pageableJogos.pageInfo?.prev != null;
  }

  openFilterDropdown(index: number): void {
    this.filters.forEach((filter, filterIndex) => {
      filterIndex === index ? filter.show = !filter.show : filter.show = false;
    })

    this.sortFilter.show = false;
  }

  openSortFilterDropdown() {
    this.closeAllFilters();
    this.sortFilter.show = !this.sortFilter.show;
  }

  openSortFilterOptionsDropdown() {
    this.closeAllFilters();
    this.sortFilter.show = false;
  }

  handleUrlParamSearch(): void {
    let term = localStorage.getItem('search');
    if (term) {
      this.search = new FormControl(term);
      
      localStorage.removeItem('search');
      this.handleSearch();
    }
  }

  handleSearch(): void {
    let filterIndex = this.filterTags.findIndex(f => f.tipo === FilterTipo.BUSCA);
    let busca = '"' + this.search.value + '"';

    if (filterIndex != -1) {
      if (!this.search.value) {
        this.addNomeToFilter('');
        this.removeFromFilterTags(filterIndex);
        this.pageable.page = 0;
        this.init();

        return;
      }

      let filter = this.filterTags[filterIndex];
      filter.nome = busca;
      this.addNomeToFilter(this.search.value);
      this.pageable.page = 0;
      this.init();
    }

    if (filterIndex === -1 && this.search.value) {
      this.filterTags.push({id: 1, nome: busca, tipo: FilterTipo.BUSCA});
      this.addNomeToFilter(this.search.value);
      this.pageable.page = 0;
      this.init();
    }
  }

  handleFilterItem(filterOption: FilterOption): void {
    this.pageable.page = 0;
    switch(filterOption.tipo) {
      case FilterTipo.MODO: this.addToFilters(this.filter.modosIds!, filterOption); break;
      case FilterTipo.CATEGORIA: this.addToFilters(this.filter.categoriasIds!, filterOption); break;
      case FilterTipo.PLATAFORMA: this.addToFilters(this.filter.plataformasIds!, filterOption); break;
    }
    this.init();
  }


  handleSortFilter(option: SortOption) {
    this.resetPageable();
    this.filter.gratuito = false;
    this.sortFilter.show = false;
    
    if (option.nome === this.sortFilter.nome) {
      return;
    }

    if (option.value === 'padrao') {
      if (this.sortFilter.nome != 'Ordenar por') {
        this.resetSortFilter();
        this.init();
      }
      return;
    }

    this.sortFilter.nome = option.nome;
    if (option.value === 'gratuito') {
      this.filter.gratuito = true;
      this.init();
      return;
    }

    this.pageable.sort = option.value;
    this.pageable.page = 0;
    this.init();
  }

 
  removeFilter(index: number): void {
    let filter = this.filterTags[index];
    this.pageable.page = 0;

    switch(filter.tipo) {
      case FilterTipo.BUSCA: {
        this.removeNomeFromFilter();
        this.clearSearch();
        this.removeFromFilterTags(index);

        break;
      }
      case FilterTipo.CATEGORIA: this.removeFromFilters(this.filter.categoriasIds!, filter); break;
      case FilterTipo.PLATAFORMA: this.removeFromFilters(this.filter.plataformasIds!, filter); break;
      case FilterTipo.MODO: this.removeFromFilters(this.filter.modosIds!, filter); break;
    }

    this.init();
  }


  private addToFilters(filterIdsList: number[], filterOption: FilterOption) {
    let index = filterIdsList.findIndex(i => i === filterOption.id);

    if (index != -1) {
      this.closeAllFilters();
      return;
    }

    this.closeAllFilters()
    this.filterTags.push(filterOption);
    filterIdsList.push(filterOption.id); 
  }

  private removeFromFilters(filterIdsList: number[], filterOption: FilterOption) {
    let filterIndex = filterIdsList.findIndex(i => i === filterOption.id);
    let tagsIndex = this.filterTags.findIndex(i => i === filterOption);

    if (filterIndex != -1 && tagsIndex != -1) {
      this.removeFromFilterTags(tagsIndex); 
      this.removeFromFilter(filterIdsList, filterIndex);
    }    
  }

  private removeFromFilter(filterIdsList: number[], index: number) {
    filterIdsList.splice(index, 1);
  }

  private removeFromFilterTags(index: number): void {
    this.filterTags.splice(index, 1);
  }

  private addNomeToFilter(nome: string): void {
    this.filter.nome = nome;
  }
  
  private removeNomeFromFilter(): void {
    this.filter.nome = '';
  }

  
  clearAllFiltros(): void {
    this.resetSortFilter();
    this.resetPageable();
    this.resetFilter();
    this.clearSearch();
    this.resetFilterTags();
    this.init();
  }

  @HostListener('document: click', ['$event'])
  private handleDocumentClick(event: any): void {
    if(!this.filterIds.includes(event.target.id)) {
      this.closeAllFilters();
      this.closeSortFilter();
    }
  }
  
  private resetPageable(): void {
    this.pageable.page = 0;
    this.pageable.size = this.PAGEABLE_DEFAULT_SIZE;
    this.pageable.sort = '';
  }

  private resetSortFilter(): void {
    this.sortFilter.nome = 'Ordenar por';
    this.closeSortFilter();
  }

  private closeSortFilter(): void {
    this.sortFilter.show = false;
  }

  private resetFilterTags(): void {
    this.filterTags = [];
  }

  private resetFilter(): void {
    this.filter.nome = '';
    this.filter.modosIds = [];
    this.filter.categoriasIds = [];
    this.filter.plataformasIds = [];
  }

  private clearSearch(): void {
    this.search = new FormControl('');
  }

  private closeAllFilters(): void {
    this.filters.forEach(filter => {
      if (filter.show) {
        filter.show = false;
      }
    })
  }

  favorite(jogoId: number) {
    this.router.navigate(['conta/desejos'])
      .then(() => {
        this.desejosService.adicionar(jogoId);
      });
  }

  addToCart(jogoResumo: JogoResumo): void {    
    if (this.jaPossuiJogo(jogoResumo.id)) {
      return;
    }

    this.router.navigate(['carrinho'])
      .then(() => {
        this.carrinhoService.addJogo(jogoResumo);
      });
  }

  isFavorited(jogoId: number): boolean {
    return this.desejosService.isPresent(jogoId);
  }

  

  jaPossuiJogo(jogoId: number): boolean {
    return this.jogosUsuarioService.isPresent(jogoId);
  }

  noCarrinho(jogoId: number): boolean {
    return this.carrinhoService.isPresent(jogoId);
  }
}
