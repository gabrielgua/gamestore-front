import { Component, OnInit } from '@angular/core';
import { JogoService } from '../service/jogo.service';
import { Jogo } from '../models/jogo';
import { Fade } from '../animations/animations';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  animations: [
    Fade
  ]
})
export class SliderComponent implements OnInit {


  constructor(private jogoService: JogoService) {}
  
  jogos: Jogo[] = [];
  currentIndex: number = 0;

  carouselWidth = 0;
  heroWidth = 75;
  gapBetweenHeros = 1;
  positionX: string = '';
  autoSlide = false;

  interval: any;

  ngOnInit(): void {
    this.jogoService.listarJogos()
      .then((jogos: Jogo[]) => {
        this.jogos = jogos; 
        this.playAutoSlide();      
        this.calculateCarouselWidth();
      }).catch((error: any) => {
        console.log(error.error);
      })
  }

  calculateCarouselWidth() {
    this.carouselWidth = this.heroWidth * this.jogos.length + (this.gapBetweenHeros * this.jogos.length - 1); 
  }

  next(): void {
    const isLastJogo = this.currentIndex === this.jogos.length - 1;
    this.currentIndex = isLastJogo ? 0 : this.currentIndex + 1;
    this.resetAnimations();
  }

  prev(): void {
    const isFirstJogo = this.currentIndex === 0;
    this.currentIndex = isFirstJogo ? this.jogos.length - 1 : this.currentIndex - 1;
    this.resetAnimations();
  }

  jumpTo(index: number): void {
    this.currentIndex = index;
    this.resetAnimations();
  }

  resetAnimations() {
    this.setPositionAnimation();
    this.resetAutoSlide();
  }

  setPositionAnimation() {
    this.positionX = '-' + (this.heroWidth * this.currentIndex + this.currentIndex);    
  }

  resetAutoSlide(): void {
    clearInterval(this.interval);
    if (this.autoSlide) {
      this.interval = setInterval(() => {
        this.next()      
      }, 5000);
    }
  }

  playAutoSlide(): void {
    
    this.autoSlide = true;
    this.resetAutoSlide();
  }

  pauseAutoSlide(): void {
    this.autoSlide = false;
    this.resetAutoSlide();
  }

  
}
