import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Jogo } from '../../models/jogos/jogo';
import { Fade } from '../../animations/animations';
import { JogosDestaque } from '../../service/jogos/jogos-destaque.service';
import { JogoResumo } from 'src/app/models/jogos/jogo.resumo';

@Component({
  selector: 'app-slider-desktop',
  templateUrl: './slider-desktop.component.html',
  styleUrls: ['./slider-desktop.component.css'],
  animations: [
    Fade
  ]
})
export class SliderDesktopComponent implements OnInit {

  constructor(private service: JogosDestaque) {}  
  
  jogosGroup: JogoResumo[][] = [];

  
  interval: any;
  autoPlay: boolean = false;
  autoPlayInterval: number = 5000;

  currentIndex: number = 0;
  carouselGroupSize: number = 3;

  ngOnInit(): void {
    this.service.getJogosDestaque().subscribe((jogos) => {
      this.jogosGroup = this.setJogosGroups(jogos, this.carouselGroupSize); 
      this.playAutoSlide();
    })    
  }

  setJogosGroups<Jogo>(jogos: Jogo[], groupSize: number): Jogo[][] {
    return jogos.reduce((groups, curr, i) => {
      if (i % groupSize === 0) groups.push([]);
      groups[groups.length - 1].push(jogos[i]);
      return groups;
    }, [] as Jogo[][]); 
  }

  goToIndex(index: number) {
    this.currentIndex = index;
    this.resetAutoPlay();
  }

  goToNext(): void {
    const isLastJogo = this.currentIndex === this.jogosGroup.length - 1;
    this.currentIndex = isLastJogo ? 0 : this.currentIndex + 1;
    this.resetAutoPlay();
  }

  goToPrevious(): void {
    const isFirstJogo = this.currentIndex === 0;
    this.currentIndex = isFirstJogo ? this.jogosGroup.length - 1 : this.currentIndex - 1;
    this.resetAutoPlay();
  }

  resetAutoPlay(): void {
    clearInterval(this.interval);
    if (this.autoPlay) {
      this.interval = setInterval(() => {
        this.goToNext();
      }, this.autoPlayInterval);
    }
  }

  pauseAutoSlide(): void {
    this.autoPlay = false;
    this.resetAutoPlay();
  }

  playAutoSlide(): void {
    this.autoPlay = true;
    this.resetAutoPlay();
  }
}
