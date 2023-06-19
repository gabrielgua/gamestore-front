import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FadeFromTop } from 'src/app/animations/animations';
import { Categoria } from 'src/app/models/categoria';
import { Modo } from 'src/app/models/modo';
import { Plataforma } from 'src/app/models/plataforma';
import { CategoriasListService } from 'src/app/service/categorias/categorias-list.service';
import { ModosListService } from 'src/app/service/modos/modos-list.service';
import { PlataformasListService } from 'src/app/service/plataformas/plataformas-list.service';


export interface FilterItem {
  nome: string,
  show: boolean,
  options: any[]
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
  animations: [FadeFromTop]
})
export class FilterComponent implements OnChanges, OnInit {

  @Input() closeAll: boolean = false;

  constructor(
    private categoriaService: CategoriasListService,
    private plataformaService: PlataformasListService ,
    private modoService: ModosListService 
  ) {}
  
  filters: FilterItem[] = [
    {nome: 'Categorias', show: false, options: []},
    {nome: 'Plataformas', show: false, options: []},
    {nome: 'Modos de jogo', show: false, options: []},
    {nome: 'Preço', show: false, options: [{id: 1, nome: 'Gratuito'}, {id: 2, nome: 'Crescente'}, {id: 3, nome: 'Decrescente'}]},
    {nome: 'Avaliações', show: false, options: [{id: 1, nome: 'Decrescente'}, {id: 2, nome: 'Crescente'}]},
  ]; 

  categorias: Categoria[] = [];
  plataformas: Plataforma[] = [];
  modos: Modo[] = [];

  ngOnInit(): void {
    this.getModos();
    this.getCategorias();
    this.getPlataformas();    
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
      this.filters.forEach(filter => {
        if (filter.show) {        
          filter.show = false;        
        }
      })    
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

  log(value: any) {
    console.log(value);
  }

}
