import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FadeFromTop } from 'src/app/animations/animations';


export interface FilterItem {
  nome: string,
  show: boolean,
  options: string[]
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
  animations: [FadeFromTop]
})
export class FilterComponent implements OnChanges {

  @Input() closeAll: boolean = false;

  constructor() {}
  

  filters: FilterItem[] = [
    {nome: 'Categorias', show: false, options: ['RPG', 'Aventura', 'Tiro']},
    {nome: 'Plataformas', show: false, options: ['PS5', 'Xbox Series X/S', 'PC', 'Nintendo switch']},
    {nome: 'Preço', show: false, options: ['Gratuito', 'Descendente', 'Crescente']},
  ]; 

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

}
