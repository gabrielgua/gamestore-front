import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { JogoService } from '../service/jogo.service';
import { Jogo } from '../models/jogo';
import { JogosDestaque } from '../service/jogos-destaque.service';

@Component({
  selector: 'app-slider-mobile',
  templateUrl: './slider-mobile.component.html',
  styleUrls: ['./slider-mobile.component.css']
})
export class SliderMobileComponent implements OnInit {

  constructor(private service: JogosDestaque) {}

  @ViewChild('carousel') carousel!: ElementRef;

  jogos: Jogo[] = [];
  currentIndex: number = 0;
  carouselWidth: number = 0;
  lastOffset: number = 0;
  autoSlideInterval: any;
  autoSlide: boolean = false;
  autoSlideInvervalAmount: number = 5000;

  carouselWidthMap = new Map<number, number>();

  ngOnInit(): void {
    this.service.getJogosDestaque().subscribe((jogos) => {
      this.jogos = jogos;
      this.playAutoSlide();
    });
  }

  populateMap(width: number): void {
    this.jogos.forEach((jogo, index) => {
      this.carouselWidthMap.set(index, this.calculateJogoWidth(index, width)); 
    })     
    
    this.updateCarouselWidth(width);
  }

  calculateJogoWidth(index: number, width: number): number {
    const isZero = index === 0;
    return isZero ? 0 : index * width;
  }

  setInitialCarouselWidth(width: number) {
    this.updateCarouselWidth(width);
  }

  updateCarouselWidth(width: number) {
    this.carouselWidth = width;    
  }

  handleScrollEvent() {
    let scrollOffset = this.carousel.nativeElement.scrollLeft;
    for (let [index, width] of this.carouselWidthMap.entries()) {
      if (scrollOffset === width) this.currentIndex = index;
    }  
    this.resetAutoSlide();  
  }

  scrollElement(amount: number) {
    this.carousel.nativeElement.scrollLeft = amount;
  }

  scrollToNext(): void {
    const isLast = this.currentIndex === this.jogos.length - 1;
    this.currentIndex = isLast ? 0 : this.currentIndex + 1;
    this.scrollElement(this.currentIndex * this.carouselWidth);
  } 

  scrollToIndex(index: number) {
    this.currentIndex = index;
    this.scrollElement(this.carouselWidth * this.currentIndex);
    this.resetAutoSlide();
  }

  resetAutoSlide(): void {
    clearInterval(this.autoSlideInterval);
    if (this.autoSlide) {
      this.autoSlideInterval = setInterval(() => {
        this.scrollToNext();
      }, this.autoSlideInvervalAmount);
    }
  }

  pauseAutoSlide(): void {
    this.autoSlide = false;
    this.resetAutoSlide();
  }

  playAutoSlide(): void {
    this.autoSlide = true;
    this.resetAutoSlide();
  }
}
