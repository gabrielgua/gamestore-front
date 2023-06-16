import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Jogo } from '../models/jogo';
import { JogoBuscarService } from '../service/jogo-buscar.service';
import { ActivatedRoute } from '@angular/router';

export interface CarouselItem {
  tipo: string;
  url: string;
}

@Component({
  selector: 'app-slider-jogo',
  templateUrl: './slider-jogo.component.html',
  styleUrls: ['./slider-jogo.component.css']
})
export class SliderJogoComponent implements OnInit {

  @ViewChild('carousel') carousel!: ElementRef;

  constructor(
    private service: JogoBuscarService,
    private route: ActivatedRoute
  ) {}

  jogo = new Jogo();
  currentIndex: number = 0;
  carouselWidth: number = 0;
  carouselItems: CarouselItem[] = [];
  carouselWidthMap = new Map<number, number>();

  ngOnInit(): void {
    this.service.getJogo().subscribe((jogo) => {      
        this.jogo = jogo;
        this.resetCarouselItems();
        this.prepareCarouselItems(this.jogo.urlVideo, this.jogo.urlImagem);
    });
  }

  resetCarouselItems(): void {
    this.carouselItems = [];
  }

  prepareCarouselItems(urlVideo: string, urlImagem: string) {
    if (this.jogo.id != null) {
      this.carouselItems.push({tipo: 'VIDEO', url: urlVideo});
      this.carouselItems.push({tipo: 'IMG', url: urlImagem});
    }
  }

  populateMap(width: number): void {
    this.carouselItems.forEach((item, index) => {
      this.carouselWidthMap.set(index, this.calculateJogoWidth(index, width)); 
    })     
    
    
    this.updateCarouselWidth(width);
  }

  calculateJogoWidth(index: number, width: number): number {
    const isZero = index === 0;
    return isZero ? 0 : index * width;
  }

  updateCarouselWidth(width: number) {
    this.carouselWidth = width;
  }

  handleScrollEvent() {
    let scrollOffset = this.carousel.nativeElement.scrollLeft;    
    for (let [index, width] of this.carouselWidthMap.entries()) {
      if (scrollOffset === width) this.currentIndex = index;
    }  
  }


  scrollToIndex(index: number): void {
    this.currentIndex = index;
    this.scrollElement(this.currentIndex * this.carouselWidth);
  }

  scrollToNext(): void {
    const isLast = this.currentIndex === this.carouselItems.length - 1;
    this.currentIndex = isLast ? 0 : this.currentIndex + 1;
    this.scrollElement(this.currentIndex * this.carouselWidth);
  }

  scrollToPrevious(): void {
    const isFirst = this.currentIndex === 0;
    this.currentIndex = isFirst ? this.carouselItems.length - 1 : this.currentIndex - 1;
    this.scrollElement(this.currentIndex * this.carouselWidth);
  }

  scrollElement(amount: number) {
    this.carousel.nativeElement.scrollLeft = amount;
  }
}
