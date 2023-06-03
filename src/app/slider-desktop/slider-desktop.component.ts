import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { JogoService } from '../service/jogo.service';
import { Jogo } from '../models/jogo';
import { Fade } from '../animations/animations';

@Component({
  selector: 'app-slider',
  templateUrl: './slider-desktop.component.html',
  styleUrls: ['./slider-desktop.component.css'],
  animations: [
    Fade
  ]
})
export class SliderDesktopComponent implements OnInit {


  constructor(private jogoService: JogoService) {}  
  
  jogos: Jogo[] = [];
  jogosGroup: Jogo[][] = [];

  currentIndex: number = 0;
  carouselWidth: number = 0;
  carouselGap: number = 16;
  positionX: number = 0;

  
  carouselGroupSize: number = 3;

  ngOnInit(): void {
    this.jogoService.listarDestaques()
      .then((jogos: Jogo[]) => {
        this.jogos = jogos; 
        this.jogosGroup = this.setJogosGroups(this.jogos, this.carouselGroupSize);
      }).catch((error: any) => {
        console.log(error.error);
      })
  }

  setJogosGroups<Jogo>(jogos: Jogo[], groupSize: number): Jogo[][] {
    return jogos.reduce((groups, curr, i) => {
      if (i % groupSize === 0) groups.push([]);
      groups[groups.length - 1].push(jogos[i]);
      return groups;
    }, [] as Jogo[][]); 
  }

  getInitialCarouselWidth(width: number): void {   
    this.updateCarouselWidth(width);    
  }

  updateCarouselWidth(width: number): void {
    this.carouselWidth = width;    
  }

  goToIndex(index: number) {
    this.currentIndex = index;
  }

  goToNext(): void {
    const isLastJogo = this.currentIndex === this.jogosGroup.length - 1;
    this.currentIndex = isLastJogo ? 0 : this.currentIndex + 1;
  }

  goToPrevious(): void {
    const isFirstJogo = this.currentIndex === 0;
    this.currentIndex = isFirstJogo ? this.jogosGroup.length - 1 : this.currentIndex - 1;
  }
}
