import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  carouselWidth: number = 0;
  carouselGap: number = 16;
  positionX: number = 0;

  ngOnInit(): void {
    this.jogoService.listarDestaques()
      .then((jogos: Jogo[]) => {
        this.jogos = jogos; 
      }).catch((error: any) => {
        console.log(error.error);
      })
  }

  getInitialCarouselWidth(width: number): void {   
    this.updateCarouselWidth(width);
  }

  updateCarouselWidth(width: number): void {
    this.carouselWidth = width;    
    this.animate();
  }

  goToNext(): void {
    const isLastJogo = this.currentIndex === this.jogos.length - 1;
    this.currentIndex = isLastJogo ? 0 : this.currentIndex + 1;
    this.animate();
  }

  goToPrevious(): void {
    const isFirstJogo = this.currentIndex === 0;
    this.currentIndex = isFirstJogo ? this.jogos.length - 1 : this.currentIndex - 1;
    this.animate();
  }

  animate(): void {    
    this.positionX = (this.carouselWidth + this.carouselGap) * this.currentIndex;
  }

}
