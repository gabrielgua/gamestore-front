import { AfterViewInit, Component, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { JogosListService } from '../service/jogos/jogos-list.service';
import { FadeFromBottom } from '../animations/animations';
import { Jogo } from '../models/jogo';
import { PageableModel } from '../models/pageable.model';
import { JogoPageableRequest } from '../models/jogo.pageable';
import { JogoFilter } from '../models/jogo.filter';
import { FormControl } from '@angular/forms';
import { Categoria } from '../models/categoria';
import { Modo } from '../models/modo';
import { Plataforma } from '../models/plataforma';
import { CategoriasListService } from '../service/categorias/categorias-list.service';
import { ModosListService } from '../service/modos/modos-list.service';
import { PlataformasListService } from '../service/plataformas/plataformas-list.service';

export interface FilterItem {
  tipo: FilterTipo,
  nome: string,
  show: boolean,
  options: any[]
}

export interface FilterTag {
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

  constructor(
    private service: JogosListService,
    private categoriaService: CategoriasListService,
    private plataformaService: PlataformasListService ,
    private modoService: ModosListService 
  ) {}
  
  
  
  jogos: Jogo[] = [];
  pageableJogos: PageableModel<Jogo> = new PageableModel();
  closeFilters: boolean = false;
  loading: boolean = false;

  PAGEABLE_DEFAULT_SIZE = 10;

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
    plataformasIds: []
  }

  filters: FilterItem[] = [
    {tipo: FilterTipo.CATEGORIA,  nome: 'Categorias',    show: false, options: []},
    {tipo: FilterTipo.PLATAFORMA, nome: 'Plataformas',   show: false, options: []},
    {tipo: FilterTipo.MODO,       nome: 'Modos de jogo', show: false, options: []},
    {tipo: FilterTipo.PRECO,      nome: 'Preço',         show: false, options: [{id: 1, nome: 'Gratuito'}, {id: 2, nome: 'Crescente'}, {id: 3, nome: 'Decrescente'}]},
    {tipo: FilterTipo.AVALIACAO,  nome: 'Avaliações',    show: false, options: [{id: 1, nome: 'Decrescente'}, {id: 2, nome: 'Crescente'}]},
  ];

  modos: Modo[] = [];
  categorias: Categoria[] = [];
  plataformas: Plataforma[] = [];

  filterTags: FilterTag[] = [];

  ngOnInit(): void {
    this.jogos = [];
    this.pageableJogos = new PageableModel();
    this.service.init(this.pageable, this.filter);
    this.fetchJogos();
    this.getModos();
    this.getCategorias();
    this.getPlataformas();
  }

  fetchJogos(): void {
    this.service.getPageableJogos().subscribe((pageableJogos) => {
      this.pageableJogos = pageableJogos;
      this.jogos = pageableJogos.content;
      this.loading = false;
    })
  }

  handleSearch() {
    let indexFiltro = this.filterTags.findIndex(aFilter => aFilter.tipo === FilterTipo.BUSCA);
    
    if (!this.search.value && this.search.value != '') {
      this.removeFilter(indexFiltro);
    }

    let busca = '"' + this.search.value  + '"';

    indexFiltro != -1
      ? this.filterTags[indexFiltro].nome = busca
      : this.filterTags.push({tipo: FilterTipo.BUSCA, nome: busca});
    
    if (this.search.value && this.search.value != '') {
      this.filter.nome = this.search.value;
    }
    
    this.service.init(this.pageable, this.filter);
  }

  removeFilter(index: number) {
    let filtro = this.filterTags[index];

    switch(filtro.tipo) {
      case FilterTipo.BUSCA: {
        this.filter.nome = '';
        this.search = new FormControl('');
        break;
      };
      case FilterTipo.CATEGORIA: {
        let categoria = this.filterTags[index];
        this.removeFromApiFilters(categoria.id!, this.filter.categoriasIds!);
        
        break;
      }
      case FilterTipo.PLATAFORMA: {
        let plataforma = this.filterTags[index];
        this.removeFromApiFilters(plataforma.id!, this.filter.plataformasIds!);
        
        break;
      }
      case FilterTipo.MODO: {
        let modo = this.filterTags[index];
        this.removeFromApiFilters(modo.id!, this.filter.modosIds!);
        
        break;
      }
    }

    this.filterTags.splice(index, 1);
    this.service.init(this.pageable, this.filter);
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

  getModos(): void {
    this.modoService.getModo().subscribe((modos) => {
      this.modos = modos;
      this.populateFilter('Modos de jogo', this.modos);
    })
  }

  getCategorias(): void {
    this.categoriaService.getCategorias().subscribe((categorias) => {
      this.categorias = categorias;
      this.populateFilter('Categorias', this.categorias);
    });
  }

  getPlataformas(): void {
    this.plataformaService.getPlataformas().subscribe((plataformas) => {
      this.plataformas = plataformas;
      this.populateFilter('Plataformas', this.plataformas);
    });
  }

  populateFilter(nome: string, options: any[]): void {
    this.filters.forEach((filter) => {
      if (filter.nome === nome) {
        filter.options = options;
      }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['closeAll'].previousValue != undefined) {
      this.closeAllFilters(); 
    }
  }

  

  handleFilterClick(id: number) {
    this.filters.forEach((filter, index) => {
      if (id === index) {
        filter.show = !filter.show;
      } else {
        filter.show = false;
      }
    })
  }

  handleFilterItemClick(option: any, tipoFiltro: FilterTipo): void {

    switch(tipoFiltro) {
      case FilterTipo.CATEGORIA: {
        this.pushToApiFilters(option.id, this.filter.categoriasIds!);
        break;
      }
      case FilterTipo.PLATAFORMA: {
        this.pushToApiFilters(option.id, this.filter.plataformasIds!);
        break;
      }
      case FilterTipo.MODO: {
        this.pushToApiFilters(option.id, this.filter.modosIds!);
        break;
      }

    }
    
    this.closeAllFilters();
    this.pushToActiveFilters(option.id, tipoFiltro, option.nome);
    this.resetPageable();
    this.service.init(this.pageable, this.filter);
  }

  private pushToApiFilters(filterId: number, filterList: number[]): void {
    let index = filterList.findIndex(i => i === filterId);
    console.log(this.filter);
    

    index != -1
      ? this.closeAllFilters()
      : filterList.push(filterId);
  }

  private removeFromApiFilters(filterId: number, filterList: number[]): void {
    let index = filterList.findIndex(i => i === filterId);
    
    index != -1 
      ? filterList.splice(index, 1)
      : null;   
  }

  private pushToActiveFilters(id: number, tipo: FilterTipo, nome: string): void {
    let index = this.filterTags.findIndex(aFilter => aFilter.nome === nome);

    index != -1 
      ? this.closeAllFilters()
      : this.filterTags.push({id: id, tipo: tipo, nome: nome});
  }

  private resetPageable(): void {
    this.pageable.page = 0;
    this.pageable.size = this.PAGEABLE_DEFAULT_SIZE;
    this.pageable.sort = '';
  }

  private closeAllFilters(): void {
    this.filters.forEach(filter => {
      if (filter.show) {
        filter.show = false;
      }
    })
  }
}
